import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    countPeer: {
      minWidth: "6.75rem",
      borderRadius: "1.5rem",
      backgroundColor: theme.palette.primary.bg2,
      color: `${theme.palette.common.white} !important`,
      padding: `0 8px 0 2px`,
      "& .MuiChip-root": {
        height: "85%",
      },
      "& svg": {
        "& path": {
          fill: theme.palette.common.white,
        }
      }
    },
    chipLive: {
      color: `${theme.palette.common.white} !important`,
      backgroundColor: `${theme.palette.primary.bg3} !important`,
    },
    chipTimeLive: {
      color: `${theme.palette.common.white} !important`,
      backgroundColor: `${theme.palette.primary.bg2} !important`,
    },
    chip: {
      background: `${theme.palette.primary.bg4} !important`,
      "& .MuiChip-label": {
        color: theme.palette.primary.gray600,
      }
    },
  }
});
