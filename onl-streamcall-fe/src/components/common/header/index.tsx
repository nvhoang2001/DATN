import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import classNames from "classnames";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { ENOTIFY_TYPE, PAGES } from "../../../constants";
import { useStyles } from "./styled";
import { useLogout } from "@/hooks/use-logout";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { notify } from "@/store/thunks/notify";
import { Paths } from "@/constants/path";
import { ReactComponent as Logo } from "@/assets/svg/logo-main.svg";
import Timestamp from "@/components/common/Timestamp";
import { authAsyncActions } from "@/store/authSlice";
import LiveStreamMenu from "./livestream-menu";

const Header: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const { isLogged } = useAppSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCommingSoon = () => {
    setAnchorElNav(null);
    dispatch(
      notify({
        type: ENOTIFY_TYPE.INFO,
        text: "Page coming soon",
      })
    );
  };

  const onLogout = () => {
    handleCloseUserMenu();
    handleLogout();
  };

  const navigateMyprofile = () => {
    navigate(Paths.MyProfile);
    handleCloseUserMenu();
  };

  React.useEffect(() => {
    if (isLogged) {
      dispatch(authAsyncActions.getProfileAction());
    }
  }, [isLogged, dispatch]);

  return (
    <AppBar position="static" className={classes.headerContainer}>
      <Container maxWidth="xl" className={classes.main}>
        <Toolbar disableGutters>
          {/* Mobile */}
          <Link to="/" className={classes.logo}>
            <Logo />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              classes={{
                paper: classes.menuMobile,
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {PAGES.filter((item) => (isLogged ? item : !item.isAuth)).map((page) => {
                if (page.path) {
                  return (
                    <NavLink to={page.path} key={page.name}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    </NavLink>
                  );
                } else {
                  return (
                    <MenuItem onClick={handleCommingSoon} key={page.name}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>

          {/* Desktop */}
          <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            noWrap
            className={classNames(classes.siteName, classes.siteNameMobile)}
          >
            Onl Stream Call
          </Typography>
          <Box component="div" className={classes.menuDesktop}>
            <div className="container">
              {PAGES.filter((item) => (isLogged ? item : !item.isAuth)).map((page) => {
                if (page.path) {
                  return (
                    <NavLink to={page.path} key={page.name} onClick={handleCloseNavMenu}>
                      <Button disableRipple sx={{ my: 2, display: "block" }}>
                        {page.name}
                      </Button>
                    </NavLink>
                  );
                } else {
                  return (
                    <Button onClick={handleCommingSoon} sx={{ my: 2, display: "block" }} key={page.name} disableRipple>
                      {page.name}
                    </Button>
                  );
                }
              })}
            </div>
          </Box>

          {!location.pathname.includes(Paths.LiveStream) ? <Timestamp /> : <LiveStreamMenu />}

          {isLogged && (
            <Box sx={{ flexGrow: 0 }} className={classes.avatar}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={`${process.env.REACT_APP_API_BASE_URL}/${profile.avatar}`} alt="Remy Sharp" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar-settings"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PopoverClasses={{ paper: classes.dropdownMenu }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={navigateMyprofile}>
                  <Typography textAlign="center">My profile</Typography>
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
