import React, { useEffect } from "react";
import BoxLSCategory from "@/components/Views/LSHomepage/BoxLSCategory";
import { ELIVESTREAM_STATUS } from "@/constants";
import { Stack } from "@mui/material";

import { useLiveStream } from "@/hooks/use-livestream";
import { useAppDispatch } from "@/hooks";
import { livestreamActions } from "@/store/livestreamSlice";
import NoResultComponent from "@/components/Views/LSHomepage/NoResult";

import _ from "lodash";

export const LiveStream: React.FC = () => {
  const { isLoading, list, handleSeeAll, getListLiveStream, params } = useLiveStream();

  const dispatch = useAppDispatch();
  useEffect(() => {
    getListLiveStream({
      ...params,
      listCategory_has: [],
      page: -1,
      size: -1,
    });

    return () => {
      dispatch(livestreamActions.setSearchText(""));
    };
  }, [params]);

  const listComingSoon = _.chain(list)
    .filter((el) => el.status === ELIVESTREAM_STATUS.COMMING_SOON)
    .map((el) => {
      return { ...el, sortStartTime: new Date(el.startTime).getTime() };
    })
    .sortBy("sortStartTime")
    .splice(0, 3)
    .value();

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      {list.length > 0 ? (
        <Stack mt={5}>
          {list.filter((el) => el.status === ELIVESTREAM_STATUS.LIVE).length > 0 && (
            <BoxLSCategory
              label="Streaming now"
              rooms={list.filter((el) => el.status === ELIVESTREAM_STATUS.LIVE).splice(0, 3)}
              onSeeAll={() => handleSeeAll(ELIVESTREAM_STATUS.LIVE)}
            />
          )}

          {listComingSoon && (
            <BoxLSCategory
              label="Streaming soon"
              rooms={listComingSoon}
              onSeeAll={() => handleSeeAll(ELIVESTREAM_STATUS.COMMING_SOON)}
            />
          )}
        </Stack>
      ) : (
        <NoResultComponent />
      )}
    </>
  );
};
