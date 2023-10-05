import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useStyles } from "../pages/LSHomepage/styles";
import { useAppSelector } from "@/hooks";
import Timestamp from "@/components/common/Timestamp";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Paths } from "@/constants/path";

export const LiveStreamLayout = () => {
  const { isLogged } = useAppSelector((state) => state.auth);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type: string) => {
    setAnchorEl(null);
    navigate(type);
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack mt={2} direction="row" justifyContent="flex-end">
          <Timestamp icon />
        </Stack>

        {location.pathname.includes("filter") ? (
          <></>
        ) : (
          <>
            {" "}
            <Typography component="h1" className={classes.title} fontWeight={800} textAlign="center">
              Professional Livestreaming Platform
            </Typography>
            <Typography component="div" className={classes.subtitle} variant="body1" textAlign="center">
              Streaming Unleashed: Share, Connect, Inspire
            </Typography>
          </>
        )}
      </Stack>

      <Stack mt={5}>
        <Outlet />
      </Stack>
      <Stack mt={5} spacing={1} alignItems="center">
        {isLogged && (
          <>
            <Typography component="div" textAlign="center" className={classes.anotation}>
              Become a Streamer now?
            </Typography>
            <Button variant="contained" className={classes.btnGoLive} onClick={handleClick}>
              Go Live
            </Button>
          </>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          className={classes.menu}
        >
          <MenuItem onClick={() => handleClose(Paths.CreateLiveStream)} className={classes.menuItem}>
            <Link to={Paths.CreateLiveStream}>Start an instant livestream</Link>
          </MenuItem>
          <MenuItem onClick={() => handleClose(Paths.LSSchedule)} className={classes.menuItem}>
            <Link to={Paths.LSSchedule}>Schedule a livestream </Link>
          </MenuItem>
        </Menu>
      </Stack>
    </>
  );
};
