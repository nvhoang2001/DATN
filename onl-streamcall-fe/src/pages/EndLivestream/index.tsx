import { useEffect } from "react";
import { Paths } from "@/constants/path";
import BufferPage from "@/components/Views/BufferPage";
import { EndLiveIcon } from "@/assets";
import { useAppDispatch } from "@/hooks";
import { roomActions } from "@/store/roomSlice";
import { EStatusLivestream } from "@/interfaces/type";

export const EndLiveStream = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(roomActions.setRoomLSInfo({ status: EStatusLivestream.COMMING_SOON, peers: 0 }));
    };
  }, [dispatch]);

  return <BufferPage title="The livestream has ended" linkRedirect={Paths.LiveStream} icon={<EndLiveIcon />} />;
};
