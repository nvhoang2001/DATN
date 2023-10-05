import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { calculateTimeLivestream, convertNumberViewer } from "@/utils";
import moment from "moment";

export const useLSStatistics = () => {
  const countPeers = useAppSelector((state) => state.room.roomInfo.peers);
  const { listCategory, realStartTime } = useAppSelector((state) => state.livestream.livestreamDetail);
  const [currentTimeLive, setCurrentTimeLive] = useState<string>("");

  useEffect(() => {
    const timeJoin = moment().format();
    const id = setInterval(() => {
      setCurrentTimeLive(calculateTimeLivestream(realStartTime || timeJoin));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [realStartTime]);

  return {
    countPeers: convertNumberViewer(countPeers || 0),
    listCategory,
    currentTimeLive,
  };
};
