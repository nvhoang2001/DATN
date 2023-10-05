import RoomContext from "@/context/RoomContext";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { TDeviceState } from "@/interfaces/waitingRoom";
import { livestreamAsyncActions } from "@/store/livestreamSlice";
import { notify } from "@/store/thunks/notify";
import { userActions } from "@/store/userSlice";
import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CodeError } from "@/constants/codeError";
import { ENOTIFY_TYPE, SESSION_STORAGE_KEY } from "@/constants";
import { Paths } from "@/constants/path";
import RoomClient from "@/classes/RoomClient";

interface IMediaSource {
  videoTracks: MediaStreamTrack[] | undefined;
  audioTracks: MediaStreamTrack[] | undefined;
  activeVideoSource: MediaStreamTrack | undefined;
  activeAudioSource: MediaStreamTrack | undefined;
}

const mediaSourcesInitValues: IMediaSource = {
  videoTracks: undefined,
  audioTracks: undefined,
  activeVideoSource: undefined,
  activeAudioSource: undefined,
};

type TUpdateMediaSource = {
  type: "UPDATE_MEDIA_SOURCES";
  value: {
    videoTracks: MediaStreamTrack[];
    audioTracks: MediaStreamTrack[];
    activeVideoSource: string;
    activeAudioSource: string;
  };
};

type TStopVideoStream = {
  type: "UPDATE_MEDIA_VIDEO_SOURCE";
  value: { enabled: boolean; videoTracks?: MediaStreamTrack[] };
};

type TStopAudioStream = {
  type: "UPDATE_MEDIA_AUDIO_SOURCE";
  value: { enabled: boolean; audioTracks?: MediaStreamTrack[] };
};

type TReducerAction = TUpdateMediaSource | TStopVideoStream | TStopAudioStream;

const activeMediaSource = {
  video: "",
  audio: "",
};

function mediaReducer(state: IMediaSource, actions: TReducerAction): IMediaSource {
  switch (actions.type) {
    case "UPDATE_MEDIA_SOURCES": {
      const { videoTracks, activeAudioSource, activeVideoSource, audioTracks } = actions.value;
      const activeAudio = audioTracks.find((track) => track.id === activeAudioSource);
      const activeVideo = videoTracks.find((track) => track.id === activeVideoSource);

      activeMediaSource.audio = activeAudio!.label;
      activeMediaSource.video = activeVideo!.label;

      return {
        audioTracks,
        videoTracks,
        activeAudioSource: activeAudio,
        activeVideoSource: activeVideo,
      };
    }

    case "UPDATE_MEDIA_VIDEO_SOURCE": {
      const updatedState = { ...state };
      const { enabled, videoTracks } = actions.value;

      if (!enabled) {
        updatedState.activeVideoSource = undefined;
        for (const track of updatedState.videoTracks || []) {
          track.stop();
        }

        updatedState.videoTracks = [];
      } else {
        updatedState.videoTracks = videoTracks;
        updatedState.activeVideoSource =
          videoTracks!.find((track) => track.label === activeMediaSource.video) || videoTracks?.[0];
      }

      return updatedState;
    }

    case "UPDATE_MEDIA_AUDIO_SOURCE": {
      const updatedState = { ...state };
      const { enabled, audioTracks } = actions.value;
      if (!enabled) {
        updatedState.activeAudioSource = undefined;
        for (const track of updatedState.audioTracks || []) {
          track.stop();
        }

        updatedState.audioTracks = [];
      } else {
        updatedState.audioTracks = audioTracks;
        updatedState.activeAudioSource =
          audioTracks!.find((track) => track.label === activeMediaSource.audio) || audioTracks?.[0];
      }
      return updatedState;
    }

    default:
      return state;
  }
}

export default function useLSWaitingRoom() {
  const [mediaSouces, mediaActionsDispatch] = useReducer(mediaReducer, mediaSourcesInitValues);
  const { roomId } = useParams();
  // Re render component -> get Devices
  const [, setForkUpdate] = useState<number>(1);

  const roomState = useAppSelector((state) => state.room.state);
  const roomClient = useContext(RoomContext);
  const user = useAppSelector((state) => state.user);

  const isDisconnectedToRoom = roomState === "disconnected";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const microphoneList = Array.from(roomClient?.microphones?.values() || []).filter(
    (mic) => mic.deviceId !== "communications"
  );
  const webcamList = Array.from(roomClient?.webcams?.values() || []).filter(
    (camera) => camera.deviceId !== "communications"
  );
  const speakerList = Array.from(roomClient?.speakers?.values() || []).filter(
    (speaker) => speaker.deviceId !== "communications"
  );

  let micState: TDeviceState = "unsupported";
  let webcamState: TDeviceState = "unsupported";

  if (!user.canSendMic) micState = "unsupported";
  else if (!user.audioMuted) micState = "on";
  else micState = "off";

  if (!user.canSendWebcam) webcamState = "unsupported";
  else if (!user.webCamDisabled) webcamState = "on";
  else webcamState = "off";

  const checkLSRoomExits = useCallback(
    async (roomId: string, roomClient: RoomClient) => {
      try {
        await dispatch(livestreamAsyncActions.checkLSRoomExitsAction(roomId)).unwrap();
        getMediaStream(roomClient)
          .then(() => {
            return updateMediaSource(roomClient);
          })
          .then(() => {
            setForkUpdate((i) => i + 1);
          });
      } catch (error: any) {
        const status = error?.response?.status;

        const code = error?.response?.data?.message;

        if (code === CodeError.LIVESTREAM_ROOM_ENDED) {
          dispatch(
            notify({
              type: ENOTIFY_TYPE.INFO,
              text: "Livestream ended",
            })
          );
          navigate(Paths.LiveStream);
        } else if (code === CodeError.ROOM_NOT_EXISTED || status === 404) {
          dispatch(
            notify({
              type: ENOTIFY_TYPE.ERROR,
              text: "Livestream room ID not existed",
            })
          );
          navigate(Paths.LiveStream);
        }
      }
    },
    [dispatch, navigate]
  );

  const micStateToggleHandler = async () => {
    let audioTracks = undefined;

    if (micState === "on") {
      dispatch(userActions.setAudioMutedState({ enabled: false }));
    } else {
      audioTracks = (
        await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: sessionStorage.getItem(SESSION_STORAGE_KEY.MIC_ID) || "default",
          },
        })
      ).getAudioTracks();

      dispatch(userActions.setAudioMutedState({ enabled: true }));
    }

    mediaActionsDispatch({
      type: "UPDATE_MEDIA_AUDIO_SOURCE",
      value: {
        enabled: !(micState === "on"),
        audioTracks,
      },
    });
  };

  const webcamStateToggleHandler = async () => {
    let videoTracks = undefined;

    if (webcamState === "on") {
      dispatch(userActions.setWebcamCapabilityState({ enabled: false }));
    } else {
      videoTracks = (
        await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: sessionStorage.getItem(SESSION_STORAGE_KEY.CAMERA_ID) || "default",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
      ).getVideoTracks();

      dispatch(userActions.setWebcamCapabilityState({ enabled: true }));
    }

    mediaActionsDispatch({
      type: "UPDATE_MEDIA_VIDEO_SOURCE",
      value: {
        enabled: !(webcamState === "on"),
        videoTracks,
      },
    });
  };

  const updateDisplayNameHandler = (name: string) => {
    // roomClient!.changeDisplayName(name);
  };

  const joinLivestreamHanler = () => {
    roomClient?.join(undefined, true);
    navigate(`/livestream/streamer/${roomId}`);
  };

  const cancelJoinLivestream = () => {
    roomClient?.cancelWaitingRoom();
    navigate(Paths.LiveStream);
  };

  const tryReconnectToLivestreamRoom = () => {
    roomClient?.prepareJoin(roomId || "");
  };

  const getMediaStream = async (roomClient: RoomClient) => {
    try {
      const mediaStream = await roomClient?.prepareJoin(roomId || "", window.location.search.includes("error"), true);
      if (mediaStream) {
        const videoTracks = mediaStream.getVideoTracks();
        const audioTracks = mediaStream.getAudioTracks();
        const [videoStream] = videoTracks;
        const [audioStream] = audioTracks;

        mediaActionsDispatch({
          type: "UPDATE_MEDIA_SOURCES",
          value: {
            videoTracks,
            audioTracks,
            activeAudioSource: audioStream.id,
            activeVideoSource: videoStream.id,
          },
        });

        dispatch(
          userActions.setMediaCapabilities({
            canSendMic: true,
            canSendWebcam: true,
          })
        );
        dispatch(
          userActions.setAudioMutedState({
            enabled: true,
          })
        );
        dispatch(
          userActions.setWebcamCapabilityState({
            enabled: true,
          })
        );
      }
    } catch (error) {
      // Mic and cam permission is denied
      if ((error as Error).name === "NotAllowedError") {
        dispatch(
          userActions.setMediaCapabilities({
            canSendMic: false,
            canSendWebcam: false,
          })
        );
      }
    }
  };

  const updateMediaSource = (roomClient: RoomClient) => {
    return roomClient?._updateMediaDeviceSource();
  };

  useEffect(() => {
    return () => {
      if (mediaSouces.audioTracks) {
        for (const track of mediaSouces.audioTracks) {
          track.stop();
        }
      }
    };
  }, [mediaSouces.audioTracks]);

  useEffect(() => {
    return () => {
      if (mediaSouces.videoTracks) {
        for (const track of mediaSouces.videoTracks) {
          track.stop();
        }
      }
    };
  }, [mediaSouces.videoTracks]);

  return {
    roomClient,
    roomId,
    user,
    micState,
    webcamState,
    isDisconnectedToRoom,
    videoTracks: mediaSouces.activeVideoSource,
    audioTracks: mediaSouces.activeAudioSource,
    videoVisible: !!mediaSouces.activeVideoSource,
    microphoneList,
    webcamList,
    speakerList,
    micStateToggleHandler,
    webcamStateToggleHandler,
    updateDisplayNameHandler,
    joinLivestreamHanler,
    cancelJoinLivestream,
    tryReconnectToLivestreamRoom,
    checkLSRoomExits,
  };
}
