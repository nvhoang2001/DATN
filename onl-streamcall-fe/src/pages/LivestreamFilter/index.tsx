import { useEffect, useState, useMemo } from "react";
import ListCategory from "@/components/Views/LSHomepage/ListCategory";
import { useStyles } from "./styles";
import ListLiveStream from "@/components/Views/LSHomepage/ListLiveStream";

import { Stack } from "@mui/material";
import { ILivestreamRoom } from "@/interfaces/type";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLSFilter } from "./useLSFilter";
import _ from "lodash";
import { livestreamActions } from "@/store/livestreamSlice";
import { EEVENT_NAME } from "@/constants";
import NoResultComponent from "@/components/Views/LSHomepage/NoResult";
const LiveStreamFilter = () => {
  const classes = useStyles();

  const { isFilter } = useAppSelector((state) => state.livestream);
  const dispath = useAppDispatch();

  const [filter, setFilter] = useState<ILivestreamRoom[]>([]);

  const { getListLiveStream, params, searchText, list, page, loadMore, count, isLoading } = useLSFilter();

  useEffect(() => {
    getListLiveStream({
      ...params,
      page: 1,
      size: page * 9,
    });
  }, [params, page]);

  const searchLiveStream = useMemo(() => {
    return _.debounce((searchText: string) => {
      getListLiveStream({
        ...params,
        name_like: searchText,
        "creator.fullname_like": searchText,
      });
    }, 500);
  }, [getListLiveStream, params]);

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
    if (list.every((i) => [...filter, ...list].includes(i))) {
      setFilter(list);
    } else {
      setFilter((pre) => _.unionBy([...pre, ...list], "id"));
    }
  }, [list]);

  useEffect(() => {
    if (isFilter) {
      dispath(livestreamActions.setFilter(false));
    }
  }, []);

  return (
    <div>
      <ListCategory />

      {isFilter &&
        (isLoading ? (
          <>Loading...</>
        ) : filter.length > 0 ? (
          <Stack mt={5}>
            <ListLiveStream rooms={filter} isLoading={isLoading} />
            {count > page * 9 && (
              <div className={classes.loadMore} onClick={loadMore}>
                Load More
              </div>
            )}
          </Stack>
        ) : (
          <NoResultComponent />
        ))}
    </div>
  );
};
export default LiveStreamFilter;
