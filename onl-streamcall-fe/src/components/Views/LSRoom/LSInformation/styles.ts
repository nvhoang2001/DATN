import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    boxDrawerContent: {
      height: "calc(100% - 3rem)",
      position: "relative",
      overflowY: "scroll",

      color: theme.palette.primary.main,
      "&::-webkit-scrollbar": {
        width: "0.1em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, .1)",
        outline: `1px solid ${theme.palette.divider}`,
      },

      "& h6": {
        wordBreak: "break-all",
      },
    },
    displayName: {
      fontWeight: 700,
    },
    title: {
      display: "flex",
      justifyContent: "space-between",
      "& h2": {
        fontSize: "22px",
        color: theme.palette.primary.main,
        fontWeight: 700,
      },
    },
    close: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    link: {
      color: theme.palette.primary.blue500,
      wordBreak: "break-all",
    },
    btnFollow: {
      minWidth: "10.25rem !important",
      "& svg path": {
        fill: `${theme.palette.common.white} !important`,
      }
    },
    description: {
      background: theme.palette.primary.bg,
      borderRadius: "0.625rem",
      padding: theme.spacing(2),
    }
  };
});
