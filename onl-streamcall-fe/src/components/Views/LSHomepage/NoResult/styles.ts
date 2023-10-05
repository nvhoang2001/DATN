import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme: Theme) => {
  return {
    noResult: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "150px 0",
      "& p": {
        color: `${theme.palette.primary.black}`,
        marginTop: "20px",
      },
    },
  };
});
