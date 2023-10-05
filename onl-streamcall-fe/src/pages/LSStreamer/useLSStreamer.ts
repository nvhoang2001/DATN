import { useState } from "react";
import RoomContext from "@/context/RoomContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IProducer } from "@/interfaces/store";
import { EDrawerType, IDrawer } from "@/interfaces/type";
import { TDeviceState } from "@/interfaces/waitingRoom";
import { useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { roomActions } from "@/store/roomSlice";
import { notify } from "@/store/thunks/notify";
import { ENOTIFY_TYPE } from "@/constants";
import { livestreamAsyncActions } from "@/store/livestreamSlice";
import { CodeError } from "@/constants/codeError";
import { Paths } from "@/constants/path";

export const useLSStreamer = () => {
  const roomClient = useContext(RoomContext);
  const producers = useAppSelector((state) => state.producer);
  const shareProducer = Object.values(producers).find((producer) => producer.type === "share");
  const isSharingScreen = !!shareProducer;
  const navigate = useNavigate();
  const me = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const drawer = useAppSelector((state) => state.room.drawer);
  const cntMessageUnRead = useAppSelector((state) => state.room.cntMessageUnRead);
  const [isLeaveRoom, setIsLeaveRoom] = useState(false);
  const livestreamDetail = useAppSelector((state) => state.livestream.livestreamDetail);
  const { roomId } = useParams();

  const outRoomHandler = async () => {
    await roomClient?.stopLivestream();
    navigate(Paths.EndLiveStream);
  };

  // Khi rời khỏi phòng bằng cách nhấn back trên trình duyệt
  useEffect(() => {
    return () => {
      roomClient?.stopLivestream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const producersArray: IProducer[] = Object.values(producers);

  const audioProducer = producersArray.find((producer) => producer.track?.kind === "audio");
  const videoProducer = producersArray.find((producer) => producer.track?.kind === "video");

  let micState: TDeviceState = "unsupported";
  if (!me.canSendMic) {
    micState = "unsupported";
  } else if (!audioProducer) {
    micState = "unsupported";
  } else if (!audioProducer.paused) {
    micState = "on";
  } else {
    micState = "off";
  }

  let webcamState: TDeviceState = "unsupported";
  if (!me.canSendWebcam) {
    webcamState = "unsupported";
  } else if (videoProducer && videoProducer.type !== "share") {
    webcamState = "on";
  } else {
    webcamState = "off";
  }

  const handleOnOffWebcam = useCallback(() => {
    if (webcamState === "on") {
      roomClient?.disableWebcam();
    } else {
      roomClient?.enableWebcam();
    }
  }, [webcamState, roomClient]);

  const handleOnOffMic = useCallback(() => {
    return micState === "on" ? roomClient?.muteMic() : roomClient?.unmuteMic();
  }, [micState, roomClient]);

  // TODO
  const shareScreenHandler = async () => {
    // const shareStream = await navigator.mediaDevices.getDisplayMedia();
    // console.log("Share stream:", shareStream);
    // roomClient?.enableShare(EScreenShareOptions.SCREEN);
    showMessageCommingsoon();
  };

  const showMessageCommingsoon = () => {
    dispatch(
      notify({
        type: ENOTIFY_TYPE.INFO,
        text: "Coming soon",
      })
    );
  };

  const setDrawer = (type: EDrawerType) => {
    const payload: IDrawer = {
      type: type,
      isOpen: false,
    };
    if (drawer.type === type) {
      payload.isOpen = !drawer.isOpen;
    } else {
      payload.isOpen = true;
    }
    dispatch(roomActions.setDrawer(payload));
  };

  const closeDrawer = () => {
    const payload: IDrawer = {
      ...drawer,
      isOpen: false,
    };
    dispatch(roomActions.setDrawer(payload));
  };

  useEffect(() => {
    if (drawer.isOpen && drawer.type === EDrawerType.CHAT) {
      dispatch(roomActions.setCntMessageUnRead({ count: 0 }));
    }
  }, [dispatch, drawer.isOpen, drawer.type]);

  useEffect(() => {
    return () => {
      dispatch(roomActions.clearMessage());
    };
  }, [dispatch]);

  const checkLSRoomExits = useCallback(
    async (roomId: string) => {
      try {
        await dispatch(livestreamAsyncActions.checkLSRoomExitsAction(roomId)).unwrap();
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
          navigate(Paths.EndLiveStream);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch, navigate]
  );

  return {
    roomId,
    micState,
    webcamState,
    isSharingScreen,
    shareProducer,
    drawer,
    isLeaveRoom,
    cntMessageUnRead,
    livestreamDetail,
    outRoomHandler,
    handleOnOffWebcam,
    handleOnOffMic,
    shareScreenHandler,
    setDrawer,
    closeDrawer,
    setIsLeaveRoom,
    showMessageCommingsoon,
    checkLSRoomExits,
  };
};
