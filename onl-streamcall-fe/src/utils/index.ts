import { ILivestreamRoomsParams } from "@/api/livestream";
import bowser from "bowser";
import { log } from "console";
import moment from "moment";

export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const browser = bowser.getParser(ua);
  let flag;

  if (browser.satisfies({ chrome: ">=0", chromium: ">=0" })) flag = "chrome";
  else if (browser.satisfies({ firefox: ">=0" })) flag = "firefox";
  else if (browser.satisfies({ safari: ">=0" })) flag = "safari";
  else if (browser.satisfies({ opera: ">=0" })) flag = "opera";
  else if (browser.satisfies({ "microsoft edge": ">=0" })) flag = "edge";
  else flag = "unknown";

  return {
    flag,
    name: browser.getBrowserName(),
    version: browser.getBrowserVersion(),
  };
};

export const getProtooUrl = (roomId: string, peerId: string, consumerReplicas: string) => {
  // const hostname = window.location.hostname;
  // let protooPort = 4443;

  // if (window.location.hostname === "test.mediasoup.org") protooPort = 4444;
  // wss://v3demo.mediasoup.org:4443/?roomId=djtnvnoj&peerId=dgqlcevi&consumerReplicas=undefined
  // return `wss://v3demo.mediasoup.org:4443/?roomId=djtnvnoj&peerId=${peerId}&consumerReplicas=${consumerReplicas}`;
  return " ";
};

export const convertNumberViewer = (numberOfView: number) => {
  if (numberOfView >= 1000000) {
    const milion = numberOfView / 1000000;
    const isRound = numberOfView % 1000000;
    return !isRound ? `${milion} M` : `${milion.toFixed(1)} M`;
  } else if (numberOfView > 999) {
    const thousand = numberOfView / 1000;
    const isRound = numberOfView % 1000;
    return !isRound ? `${thousand} M` : `${thousand.toFixed(1)} K`;
  } else {
    return numberOfView;
  }
};

export const getImageThumbnail = (url?: string) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  if (url) {
    return `${baseUrl}/${url}`;
  }
  return "";
};
export const calculateTimeLivestream = (startTime: string) => {
  if (!startTime) return "00:00:00";
  const now = moment();
  const start = moment(startTime);
  const duration = moment.duration(now.diff(start));

  const hours = duration.get("hours") < 10 ? "0" + duration.get("hours") : duration.get("hours");
  const minutes = duration.get("minutes") < 10 ? "0" + duration.get("minutes") : duration.get("minutes");
  const seconds = duration.get("seconds") < 10 ? "0" + duration.get("seconds") : duration.get("seconds");

  return hours + ":" + minutes + ":" + seconds;
};

export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key: string) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: ILivestreamRoomsParams) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};
