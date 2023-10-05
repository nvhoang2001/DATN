import { ILivestreamRoom, ILivestreamRoomsResponse } from "@/interfaces/type";
import moment from "moment";
import { Reducer } from "react";

type RoomPayloadStatus = {
  roomId: string;
  numberOfViewers: number;
  status: "live" | "coming_soon" | "ended";
};
export type TLiveStreamState = {
  count: number;
  totalPages: number;
  rooms: ILivestreamRoom[];
};

export type TLiveStreamAction =
  | { type: "setLSHomepageState"; payload: ILivestreamRoomsResponse }
  | { type: "setRooms"; payload: any }
  | { type: "setViewers"; payload: any }
  | { type: "setRoomStatus"; payload: RoomPayloadStatus };

export const initialState: TLiveStreamState = {
  count: 0,
  totalPages: 0,
  rooms: [],
};

export const lsHomepageReducer: Reducer<TLiveStreamState, TLiveStreamAction> = (state, action) => {
  switch (action.type) {
    case "setLSHomepageState": {
      const response = action.payload;
      const { data, meta } = response;

      return {
        ...state,
        count: meta.count,
        totalPages: meta.totalPages,
        rooms: data,
      };
    }

    case "setRoomStatus": {
      const { roomId, numberOfViewers, status } = action.payload;

      const room = state.rooms.find((room) => room.id === roomId);
      if (!room) return state;

      const updatedRoom = { ...room, status, peersCount: numberOfViewers, realStartTime: moment().format() };
      const updateRooms = [...state.rooms.filter((room) => room.id !== roomId), updatedRoom];

      return {
        ...state,
        rooms: updateRooms,
      };
    }

    default: {
      return state;
    }
  }
};
