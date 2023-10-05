import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme: Theme) => {
  return {
    loadMore: {
      fontSize: "16px !important",
      color: `${theme.palette.primary.activeLink} !important`,
      margin: "20px auto !important",
      cursor: "pointer",
    },
  };
});
