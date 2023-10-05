import { TLiveStreamAction, TLiveStreamState, initialState, lsHomepageReducer } from "@/pages/LSHomepage/reducer";
import React, { createContext, useReducer } from "react";

export const LiveStreamContext = createContext<{
  state: TLiveStreamState;
  dispatch: React.Dispatch<TLiveStreamAction>;
}>({
  state: { ...initialState },
  dispatch: () => {},
});

export const LiveStreamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(lsHomepageReducer, initialState);
  return <LiveStreamContext.Provider value={{ state, dispatch }}>{children}</LiveStreamContext.Provider>;
};
