import { Chip, Stack } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { EyeIcon } from "@/assets";
import { useLSStatistics } from "./useLSStatistics";


const LSStatistics: React.FC = () => {
  const classes = useStyles();
  const { countPeers, currentTimeLive, listCategory } = useLSStatistics();

  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center" className={classes.countPeer}>
        <Chip label="Live" className={classes.chipLive} />
        <EyeIcon />
        <span>{countPeers}</span>
      </Stack>
      <Chip label={currentTimeLive} className={classes.chipTimeLive} />
      {listCategory?.length > 0 && (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {listCategory.map((tag, idx) => (
            <Chip key={idx} label={tag} className={classes.chip} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default LSStatistics;
