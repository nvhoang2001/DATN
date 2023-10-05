import { QueryMapping } from "@/hooks";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const mobile = QueryMapping.mobile;
  return {
    main: {
      position: "relative",
      minHeight: "100vh",
      background: theme.palette.primary.main,
    },
    wrapperMainScreen: {
      position: "fixed",
      width: "100%",
      height: "calc(100% - 5rem)",
    },
    listPeer: {
      height: "100%",
      overflowY: "scroll",
      display: "grid",
      padding: "1rem",
      gap: "1rem",
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
    },
    action: {
      width: "100%",
      height: "5rem",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: theme.palette.primary.main,
    },
    actionLeftRight: {
      display: "flex",
      [mobile]: {
        display: "none !important",
      },
    },

    actionRight: {
      "& .MuiBadge-badge": {
        background: "transparent",
        color: theme.palette.common.white,
      },
    },

    actionRightActive: {
      color: theme.palette.primary.primary,
      "& .MuiBadge-badge": {
        color: theme.palette.primary.white,
        width: "18px",
        height: "18px",
        background: theme.palette.primary.blue900,
    
      },
      "& svg": {
        fill: theme.palette.primary.primary,
        // "& path": {
        //   fill: theme.palette.primary.primary,
        // },
      },
    },

    meetingName: {
      color: theme.palette.common.white,
      "& h1": {
        fontSize: "22px !important",
        fontWeight: 700,
      },
      "& div:last-child": {
        color: theme.palette.common.white,
        padding: 0,
        border: "none",
        "& h6": {
          color: theme.palette.common.white,
          fontSize: "14px !important",
        },
      },
    },

    actionCenter: {
      display: "flex",
      justifyContent: "space-between",
      gap: "0.4rem",
      "& > button": {
        width: "2.625rem",
        height: "2.625rem",
        background: theme.palette.primary.gray500,
        transition: ".25s",

        "&:hover": {
          background: theme.palette.primary.extraText,
        },

        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },

        "&.media-off": {
          background: theme.palette.primary.red500,
        },
      },
      "& .end-call": {
        width: "5.1875rem",
        borderRadius: "1.3125rem",
        background: theme.palette.primary.red500,
      },
    },

    boxDrawer: {
      height: "calc(100% - 2rem)",
      "& .MuiPaper-root": {
        height: "100%",
        "& .MuiCardContent-root": {
          height: "100%",
        },
      },
    },
    permission: {
      padding: "30px 40px 0px",
    },

    dialogLeave: {
      "& .MuiDialog-paper": {
        borderRadius: 20,
      },
    },
    leaveRoom: {
      padding: "50px 40px 0px",
    },
    title: {
      textAlign: "center",
      fontSize: "22px !important",
      fontWeight: "700 !important",
      color: `${theme.palette.primary.main}`,
    },
    content: {
      color: `${theme.palette.primary.main} !important`,
      marginTop: "20px !important",
    },
    btnAction: {
      display: "flex",
      justifyContent: "space-between",
      padding: "30px 40px 50px",
      gap: 20,
      "& button": {
        flex: 1,
        borderRadius: 8,
        fontSize: "16px !important",
      },
    },
  };
});
