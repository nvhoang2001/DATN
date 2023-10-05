import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme: Theme) => {
  return {
    detail: {},
    title: {
      fontSize: "28px !important",
      color: theme.palette.primary.dark,
    },
    loadMore: {
      fontSize: "16px !important",
      color: `${theme.palette.primary.activeLink} !important`,
      margin: "20px auto !important",
      cursor: "pointer",
    },
  };
});
