import { NoResultIcon } from "@/assets";
import { useStyles } from "./styles";
import { Typography } from "@mui/material";
const NoResultComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.noResult}>
      <NoResultIcon /> <Typography> No Results</Typography>
    </div>
  );
};
export default NoResultComponent;
