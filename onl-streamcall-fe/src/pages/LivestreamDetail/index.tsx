import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Stack, Typography } from "@mui/material";

import { ILivestreamRoom } from "@/interfaces/type";
import { ELIVESTREAM_STATUS } from "@/constants";

import ListLiveStream from "@/components/Views/LSHomepage/ListLiveStream";

import _ from "lodash";
import { useLiveStream } from "@/hooks/use-livestream";
import { useAppDispatch } from "@/hooks";
import { livestreamActions } from "@/store/livestreamSlice";
import NoResultComponent from "@/components/Views/LSHomepage/NoResult";

const LiveStreamDetail: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState<ILivestreamRoom[]>([]);
  const { isLoading, params, list, page, meta, getListLiveStream, loadMore, status } = useLiveStream();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getListLiveStream({
      ...params,
      listCategory_has: [],
      page: 1,
      size: page * 9,
      status,
      sort_by: status === ELIVESTREAM_STATUS.COMMING_SOON ? "startTime" : "createAt",
      order_by: status === ELIVESTREAM_STATUS.COMMING_SOON ? "asc" : "desc",
    });

    return () => {
      dispatch(livestreamActions.setSearchText(""));
    };
  }, [status, page, params, status]);

  useEffect(() => {
    if (list.every((i) => [...data, ...list].includes(i))) {
      setData(list);
    } else {
      setData((pre) => _.unionBy([...pre, ...list], "id"));
    }
  }, [list]);

  const getTitle = () => {
    if (status === ELIVESTREAM_STATUS.LIVE) {
      return "Streaming now";
    } else if (status === ELIVESTREAM_STATUS.COMMING_SOON) {
      return "Streaming soon";
    } else {
      return "My following";
    }
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {data.length > 0 ? (
        <Stack mt={5}>
          <Typography component="h3" className={classes.title} fontWeight={700}>
            {getTitle()}
          </Typography>
          <ListLiveStream rooms={data} isLoading={isLoading} />
          {meta && meta?.count > page * 9 && (
            <div className={classes.loadMore} onClick={loadMore}>
              Load More
            </div>
          )}
        </Stack>
      ) : (
        <NoResultComponent />
      )}
    </>
  );
};

export default LiveStreamDetail;
