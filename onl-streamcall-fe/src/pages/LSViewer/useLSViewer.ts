import { ENOTIFY_TYPE } from "@/constants";
import { CodeError } from "@/constants/codeError";
import { Paths } from "@/constants/path";
import RoomContext from "@/context/RoomContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { EDrawerType, EStatusLivestream, IDrawer } from "@/interfaces/type";
import { livestreamAsyncActions } from "@/store/livestreamSlice";
import { roomActions } from "@/store/roomSlice";
import { notify } from "@/store/thunks/notify";
import { useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useLSViewer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const roomClient = useContext(RoomContext);
  const drawer = useAppSelector((state) => state.room.drawer);
  const cntMessageUnRead = useAppSelector((state) => state.room.cntMessageUnRead);
  const consumers = useAppSelector((state) => state.consumer);
  const faceDetection = useAppSelector((state) => state.room.faceDetection);
  const { status } = useAppSelector((state) => state.room.roomInfo);
  const consumersArray = Object.values(consumers);
  const livestreamDetail = useAppSelector((state) => state.livestream.livestreamDetail);

  const audioConsumer = consumersArray?.find((consumer) => consumer.track.kind === "audio");
  const videoConsumer = consumersArray?.find((consumer) => consumer.track.kind === "video");

  const videoVisible =
    Boolean(videoConsumer) &&
    videoConsumer !== undefined &&
    !videoConsumer.locallyPaused &&
    !videoConsumer.remotelyPaused;

  const audioVisible =
    Boolean(audioConsumer) &&
    audioConsumer !== undefined &&
    !audioConsumer.locallyPaused &&
    !audioConsumer.remotelyPaused;

  const showMessageCommingsoon = () => {
    dispatch(
      notify({
        type: ENOTIFY_TYPE.INFO,
        text: "Coming soon",
      })
    );
  };

  useEffect(() => {
    if (status === EStatusLivestream.END) navigate(Paths.EndLiveStream);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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

  const leaveLSRoom = () => {
    navigate(Paths.LiveStream);
  };

  useEffect(() => {
    return () => {
      roomClient?.viewerLeaveLSRoom();
      dispatch(roomActions.clearMessage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    livestreamDetail,
    roomClient,
    roomId,
    drawer,
    cntMessageUnRead,
    audioConsumer,
    videoConsumer,
    audioMuted: !audioVisible,
    videoVisible,
    faceDetection,
    setDrawer,
    closeDrawer,
    showMessageCommingsoon,
    checkLSRoomExits,
    leaveLSRoom,
  };
};
