import { Grid } from "@mui/material";
import LSPanel from "../LSPanel";
import { ILivestreamRoom } from "@/interfaces/type";

import { useStyles } from "./styles";
import React from "react";
import { ELIVESTREAM_STATUS } from "@/constants";

const ListLiveStream: React.FC<{ rooms: ILivestreamRoom[]; isLoading: boolean }> = ({ rooms, isLoading }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} mt={2}>
      {rooms
        .filter((el) => el.status !== ELIVESTREAM_STATUS.END)
        .map((room: ILivestreamRoom) => (
          <Grid item key={room.id} xs={4}>
            <LSPanel
              id={room.id}
              title={room.name}
              tags={room.listCategory}
              label={room.status}
              startTime={room.realStartTime || room.startTime}
              peersCount={room.peersCount}
              creator={room.creator}
              thumbnail={room.thumbnail}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default ListLiveStream;
