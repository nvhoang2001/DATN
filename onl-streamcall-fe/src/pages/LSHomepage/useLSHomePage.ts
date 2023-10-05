import { ILivestreamRoomsParams, getLivestreamRooms } from "@/api/livestream";
import { socketFactory } from "@/classes/SocketFactory";
import { EEVENT_NAME } from "@/constants";
import { LiveStreamContext } from "@/context/LiveStreamContext";
import { useAppSelector } from "@/hooks";
import { ILivestreamRoom } from "@/interfaces/type";
import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import _debounce from "lodash/debounce";

export const useLSHomePage = () => {
  const { state, dispatch } = useContext(LiveStreamContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { params } = useAppSelector((state) => state.livestream);
  const rooms: ILivestreamRoom[] = state.rooms;
  const navigate = useNavigate();

  const [socket] = useState<Socket>(() =>
    io(socketFactory.getDefaultSocketURL(), {
      secure: true,
      transports: ["websocket"],
      auth: {},
    })
  );

  const getListLiveStream = useCallback(
    async (params: ILivestreamRoomsParams) => {
      try {
        setIsLoading(true);
        const res = await getLivestreamRooms(params, true);
        dispatch({ type: "setLSHomepageState", payload: res });
        const roomIds = res.data.map((room) => room.id);
        socket.emit("subscribeRoomStatus", {
          roomIds,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, socket]
  );

  const searchLiveStream = useMemo(() => {
    return _debounce((searchText: string) => {
      getListLiveStream({
        ...params,
        name_like: searchText,
        "creator.fullname_like": searchText,
        listCategory_has: [],
        page: -1,
        size: -1,
      });
    }, 500);
  }, [getListLiveStream, params]);

  const handleSeeAll = (status: string) => {
    navigate(`/livestream/${status}`);
  };

  useEffect(() => {
    getListLiveStream({
      ...params,
      name_like: "",
      "creator.fullname_like": "",
      listCategory_has: [],
      page: -1,
      size: -1,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getListLiveStream]);

  useEffect(() => {
    const updateSearchHandler = (event: CustomEvent<{ data: { value: string } }>) => {
      const searchText = event.detail.data.value;

      searchLiveStream(searchText);
    };

    window.addEventListener(EEVENT_NAME.UPDATE_SEARCH, updateSearchHandler);
    return () => {
      window.removeEventListener(EEVENT_NAME.UPDATE_SEARCH, updateSearchHandler);
    };
  }, [searchLiveStream]);

  useEffect(() => {
    socket.on("connect", () => {
      console.debug("socket io connect tn");
    });

    socket.on("roomStatusUpdated", (data) => {
      const { id, numberOfViewers, status } = data;
      dispatch({ type: "setRoomStatus", payload: { roomId: id, numberOfViewers, status } });
    });

    return () => {
      console.log("disconnect!");
      socket.disconnect();
    };
  }, [socket, dispatch]);

  return {
    isLoading,
    rooms,
    handleSeeAll,
    params,
    getListLiveStream,
  };
};
