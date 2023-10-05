import { ILivestreamRoomsParams, getLivestreamRooms } from "@/api/livestream";
import { socketFactory } from "@/classes/SocketFactory";
import { LiveStreamContext } from "@/context/LiveStreamContext";
import { useAppSelector } from "@/hooks";
import { ILivestreamRoom } from "@/interfaces/type";
import { useState, useEffect, useContext } from "react";
import { Socket, io } from "socket.io-client";

export const useLSDetail = () => {
  const { state, dispatch } = useContext(LiveStreamContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { params, searchText } = useAppSelector((state) => state.livestream);
  const [list, setList] = useState<ILivestreamRoom[]>([]);

  const totalPages = state.totalPages;
  const count = state.count;

  const [page, setPage] = useState<number>(1);

  const [roomUpdate, setRoomUpdate] = useState<{ id: string; numberOfViewers: number; status: string }>();

  const [socket] = useState<Socket>(() =>
    io(socketFactory.getDefaultSocketURL(), {
      secure: true,
      transports: ["websocket"],
      auth: {},
    })
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.debug("socket io connect tn");
    });

    socket.on("roomStatusUpdated", (data) => {
      const { id, numberOfViewers, status } = data;

      dispatch({ type: "setRoomStatus", payload: { roomId: id, numberOfViewers, status } });

      setRoomUpdate({ ...data });
    });

    return () => {
      console.log("disconnect!");
      socket.disconnect();
    };
  }, [socket, dispatch]);

  useEffect(() => {
    const result = list.map((el) => {
      return el.id === roomUpdate?.id
        ? { ...el, peersCount: roomUpdate.numberOfViewers, status: roomUpdate.status }
        : { ...el };
    });

    setList(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomUpdate]);

  const getListLiveStream = async (params: ILivestreamRoomsParams) => {
    try {
      setIsLoading(true);
      const res = await getLivestreamRooms(params, true);
      dispatch({ type: "setLSHomepageState", payload: res });
      setList(res.data);

      const roomIds = res.data.map((room) => room.id);
      socket.emit("subscribeRoomStatus", {
        roomIds,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage((pre) => pre + 1);
  };

  return {
    isLoading,
    page,
    totalPages,
    params,
    list,
    searchText,
    count,
    setPage,
    loadMore,
    getListLiveStream,
  };
};
