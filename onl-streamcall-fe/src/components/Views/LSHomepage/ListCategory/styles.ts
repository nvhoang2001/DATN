import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapList: {
      display: "flex",
      justifyContent: "center",
      gap: "35px 20px",
      paddingBottom: "60px",
      flexWrap: "wrap",
      borderBottom: `1px solid ${theme.palette.primary.border4}`,
      "&:hover": {
        cursor: "pointer",
      },
    },
    itemList: {
      position: "relative",
    },
    title: {
      textAlign: "center",
      fontSize: "35px !important",
      color: `${theme.palette.primary.main} !important`,
      fontWeight: `800 !important`,
      marginTop: "35px !important",
      marginBottom: "60px !important",
    },
    tagName: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: theme.palette.primary.white,
      fontSize: "22px",
      fontWeight: 700,
      zIndex: 5,
    },

    overlay: {
      position: "relative",
      "&:after": {
        content: "''", // :before and :after both require content
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 3,
        backgroundColor: theme.palette.primary.blue500,
        borderRadius: "10px",
        height: "79px",
      },
    },
  };
});
