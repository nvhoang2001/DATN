import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    label: {
      fontSize: "1.75rem !important",
      color: theme.palette.primary.dark,
    },
    btnSeeAll: {
      fontWeight: 500,
      fontSize: "0.875rem !important",
      color: `${theme.palette.primary.blue500} !important`,
      padding: "0.5rem 1rem !important",
      border: `1px solid ${theme.palette.primary.border2} !important`,
      background: "transparent",
      borderRadius: "3.125rem !important",
    }
  };
});
