import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    liveStream: {},
    title: {
      fontSize: "2.1875rem !important",
      color: theme.palette.primary.dark,
      lineHeight: "3.125rem !important",
    },
    subtitle: {
      color: theme.palette.primary.dark,
    },
    anotation: {
      color: theme.palette.primary.dark,
    },
    btnGoLive: {
      width: "25.4375rem",
      fontWeight: "700 !important",
    },
    menu: {
      "& .MuiMenu-paper": {
        borderRadius: 10,
      },
    },
    menuItem: {
      height: 50,
      "&:hover": {
        background: `${theme.palette.primary.menuItem} !important`,
      },

      "& a": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
  };
});
