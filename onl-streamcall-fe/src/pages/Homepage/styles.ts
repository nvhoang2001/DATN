import { QueryMapping } from "@/hooks";
import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles((theme: Theme) => {
  return {
    link: {
      color: theme.palette.primary.black,
      "& a": {
        color: theme.palette.primary.blue500,
        fontWeight: 700,
        textDecoration: "none",
        "&:hover": {
          color: theme.palette.primary.blue400,
        },
      },
    },
    input: {
      margin: `0 !important`,
    },
    button: {
      "& > h6": {
        padding: "10px 50px",
        fontSize: "1.125rem",
      },
    },
    form: {
      marginTop: "10px !important",
      display: "flex",
      alignItems: "flex-start",
      gap: theme.spacing(2),
    },
    title: {
      color: theme.palette.primary.main,
      fontSize: "60px !important",
      marginBottom: "40px !important",
    },
  };
});

export const useStyles2 = makeStyles((theme: Theme) => {
  const mobile = QueryMapping.mobile;
  return {
    dashboardContainer: {
      width: "100%",
      color: theme.palette.primary.black,
    },
    content: {
      marginTop: theme.spacing(2),
    },
    form: {
      marginTop: 12,
      display: "flex",
      alignItems: "flex-start",
      gap: theme.spacing(2),
    },
    input: {
      height: 25,
      width: "100%",
      "&.MuiFormControl-root": {
        margin: 0,
      },
    },
    boxGallery: {
      display: "flex",
      [mobile]: {
        display: "none !important",
      },
      "& img": {
        width: "50%",
        height: "auto",
        objectFit: "contain",
      },
    },
    dialog: {
      "& .MuiPaper-root": {
        borderRadius: 20,
      },
    },
    contentDialog: {
      width: "500px",
      borderRadius: 20,
      position: "relative",
      boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)",
      background: "white",
      padding: "50px",
    },
    header: {
      textAlign: "center",
      "& p": {
        marginTop: "16px",
        lineHeight: "26px",
        color: theme.palette.primary.main,
        marginBottom: 20,
      },
    },
    iconTitle: {},
    close: {
      position: "absolute",
      top: 20,
      right: 25,

      "&:hover": {
        cursor: "pointer",
      },
    },
    linkContent: {
      background: theme.palette.primary.bg,
      borderRadius: 10,
      padding: "20px",
      textAlign: "center",
      "& p": {
        color: theme.palette.primary.main,
        fontWeight: 700,
        wordBreak: "break-all",
      },
    },
    link: {
      color: theme.palette.primary.blue500,
      marginBottom: "15px",
      display: "inline-block",
      fontWeight: 700,
      wordBreak: "break-all",
    },
    email: {
      width: 200,
      marginRight: 20,
    },

    action: {
      display: "flex",
      marginTop: "30px",
      gap: 20,
    },
    copy: {
      "&.MuiButton-root": {
        boxShadow: "none",
        flex: 1,
        background: theme.palette.primary.cancel,
        color: theme.palette.primary.blue900,
        fontWeight: 700,
        fontSize: "1rem",
        "&:hover": {
          background: theme.palette.primary.cancel,
        },
      },
    },
    share: {
      "&.MuiButton-root": {
        boxShadow: "none",
        flex: 1,
      },
    },
    error: {
      color: "#f44336",
      display: "inline-block",
      marginTop: "12px",
      fontSize: 12,
    },
    button: {
      "&.MuiButton-root": {
        width: "140px",
        fontSize: "1.125rem",
        fontStyle: "normal",
        fontWeight: "800",
        lineHeight: "28px",
      },
    },
    title: {
      color: theme.palette.primary.main,
    },
    boxMenuItems: {
      "& .MuiMenu-paper": {
        minWidth: "270px",
      },
    },

    subtitle: {
      fontSize: "18px !important",
      marginBottom: "15px !important",
    },
  };
});
