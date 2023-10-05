import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    boxLSPanel: {
      position: "relative",
      boxShadow: "none !important",
      borderRadius: "0.625rem",
      border: `1px solid ${theme.palette.primary.border2}`,
      "& a": {
        textDecoration: "none",
      },
    },
    lsPanelImg: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    lsPanelImgHover: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    bg: {
      position: "relative",
      "&:hover": {
        "& svg": {
          display: "block !important",
        },
        "&:after": {
          content: "''", // :before and :after both require content
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#1F1D2B",
          opacity: 0.5,
        },
      },
    },

    icon: {
      display: "none",
      position: "absolute",
      zIndex: 1000,
      top: "42%",
      width: "100%",
      "&:hover": {
        cursor: "pointer",
      },
    },
    chip: {
      background: theme.palette.primary.bg4,
      "& .MuiChip-label": {
        color: theme.palette.primary.gray600,
      },
    },
    mainColor: {
      color: theme.palette.primary.dark,
      fontSize: "14px",
    },
    title: {
      fontSize: "1.125rem !important",
      width: "90%",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    tag: {
      background: "rgba(31, 29, 43, 0.76)",
      borderRadius: "24px",
      position: "absolute",
      top: 20,
      left: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 10,
      padding: "2px 6px",
      gap: 8,
      color: theme.palette.primary.white,
    },
    live: {
      width: 40,
      height: 26,
      background: `${theme.palette.primary.live} !important`,
      borderRadius: 20,
      lineHeight: "26px !important",
      textAlign: "center",
      fontSize: "12px !important",
      justifyContent: "space-between",
      marginLeft: "-4px",
    },
    comingSoon: {
      minHeight: 30,
      justifyContent: "center",
      "& p": {
        fontSize: "12px !important",
        lineHeight: "20px !important",
      },
    },
    viewer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 3,
      "& p": {
        fontSize: "12px !important",
      },
      marginRight: 8,
    },
    time: {
      background: theme.palette.primary.blue500,
      borderRadius: 13,
      padding: "4px 8px",
      color: theme.palette.primary.white,
      "& .timestamp": {
        padding: "0px !important",
      },
    },
    chipTimeLive: {
      color: `${theme.palette.common.white} !important`,
      backgroundColor: `${theme.palette.primary.bg2} !important`,
    },

    tagLive: {
      padding: "2px 6px 2px 2px",
    },
  };
});
