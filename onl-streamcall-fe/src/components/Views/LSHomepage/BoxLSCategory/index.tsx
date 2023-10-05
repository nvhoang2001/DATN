import { Box, ButtonBase, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import LSPanel from "../LSPanel";
import { ILivestreamRoom } from "@/interfaces/type";

interface IBoxLSCategory {
  label: string;
  rooms: ILivestreamRoom[];
  onSeeAll: () => void;
}

const BoxLSCategory: React.FC<IBoxLSCategory> = ({ label, rooms, onSeeAll }) => {
  const classes = useStyles();

  return (
    <Box mt={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h3" className={classes.label} fontWeight={700}>
          {label}
        </Typography>
        <ButtonBase className={classes.btnSeeAll} onClick={onSeeAll}>
          See All
        </ButtonBase>
      </Stack>
      <Grid container spacing={2} mt={2}>
        {rooms.map((room) => (
          <Grid item key={room.id} xs={4}>
            <LSPanel
              id={room.id}
              title={room.name}
              tags={room.listCategory}
              label={room.status}
              peersCount={room.peersCount}
              creator={room.creator}
              thumbnail={room.thumbnail ? room.thumbnail : room.liveThumbnail}
              startTime={room.realStartTime || room.startTime}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BoxLSCategory;
