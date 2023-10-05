import { Badge, Box, Card, CardContent, Container, Drawer, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useStyles } from "./styles";
import { useLSStreamer } from "./useLSStreamer";
import Timestamp from "@/components/common/Timestamp";
import {
  MicrophoneIcon,
  MicrophoneOffIcon,
  VideocamIcon,
  VideocamOffIcon,
  ShareScreenIcon,
  EmojiIcon,
  SettingIcon,
  InfoIcon,
  ChatIcon,
  CategoriesIcon,
  HeadPhoneIcon,
  ChatActiveIcon,
} from "@/assets";
import classNames from "classnames";
import { EDrawerType } from "@/interfaces/type";
import Activities from "@/components/Views/VideoCall/BoxDrawer/Activities";
import Chat from "@/components/Views/VideoCall/BoxDrawer/Chat";
import Me from "@/components/Views/VideoCall/Me";
import { BaseDialog } from "@/components/common/base-dialog";
import { Button } from "@mui/material";
import LSInfomation from "@/components/Views/LSRoom/LSInformation";

const LSStreamer: React.FC = () => {
  const classes = useStyles();
  const {
    roomId,
    micState,
    webcamState,
    drawer,
    cntMessageUnRead,
    isLeaveRoom,
    livestreamDetail,
    handleOnOffMic,
    handleOnOffWebcam,
    setDrawer,
    closeDrawer,
    showMessageCommingsoon,
    setIsLeaveRoom,
    outRoomHandler,
    checkLSRoomExits,
  } = useLSStreamer();

  useEffect(() => {
    if (roomId) {
      checkLSRoomExits(roomId);
    }
  }, [roomId, checkLSRoomExits]);

  const renderDrawerContent = () => {
    switch (drawer.type) {
      case EDrawerType.INFORMATION_ROOM:
        return <LSInfomation isStreamer onClose={closeDrawer} />;
      case EDrawerType.CHAT:
        return <Chat onClose={closeDrawer} />;
      case EDrawerType.ACTIVITIES:
        return <Activities onClose={closeDrawer} />;
      default:
        return;
    }
  };

  return (
    <Container maxWidth={false} disableGutters className={classes.main}>
      <Box component="div" className={classes.wrapperMainScreen}>
        <div
          className={classes.listPeer}
          style={{
            width: drawer.isOpen ? "calc(100% / 12 * 9)" : "100%",
            gridTemplateColumns: "repeat(auto-fit, minmax(24%, 1fr))",
            gridTemplateRows: "repeat(auto-fit, minmax(calc(100% / 3 - 0.65rem), 1fr))",
          }}
        >
          <Me isLivestream />
        </div>
        <Drawer
          sx={{
            width: "calc(100% / 12 * 3)",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "calc(100% / 12 * 3)",
              height: "calc(100% - 5rem)",
              background: "transparent",
              border: "none",
            },
          }}
          variant="persistent"
          anchor="right"
          open={drawer.isOpen}
        >
          <Box component="div" margin={2} className={classes.boxDrawer}>
            <Card>
              <CardContent>{renderDrawerContent()}</CardContent>
            </Card>
          </Box>
        </Drawer>
      </Box>
      <Box component="div" className={classes.action}>
        <Grid container padding={2}>
          <Grid container item xs={4} md={4} className={classes.actionLeftRight} justifyContent="flex-start">
            <Box component="div" marginLeft={2}></Box>
            <div className={classes.meetingName}>
              <Typography variant="h6" component="h1">
                {livestreamDetail.name}
              </Typography>
              <Timestamp />
            </div>
          </Grid>
          <Grid container item xs={12} md={4} justifyContent="center" className={classes.actionCenter}>
            <IconButton onClick={handleOnOffMic} className={classNames({ "media-off": micState === "off" })}>
              {micState === "on" ? <MicrophoneIcon /> : <MicrophoneOffIcon />}
            </IconButton>
            <IconButton onClick={handleOnOffWebcam} className={classNames({ "media-off": webcamState === "off" })}>
              {webcamState === "on" ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton onClick={() => showMessageCommingsoon()}>
              <HeadPhoneIcon />
            </IconButton>
            <IconButton onClick={() => showMessageCommingsoon()}>
              <ShareScreenIcon />
            </IconButton>
            <IconButton onClick={() => showMessageCommingsoon()}>
              <EmojiIcon />
            </IconButton>
            <IconButton onClick={() => showMessageCommingsoon()}>
              <SettingIcon />
            </IconButton>
            <Button variant="contained" className="end-call" onClick={() => setIsLeaveRoom(true)}>
              <Typography>Stop Livestream</Typography>
            </Button>
          </Grid>
          <Grid container item xs={4} className={classes.actionLeftRight} justifyContent="flex-end">
            <IconButton
              className={classNames(classes.actionRight, {
                [classes.actionRightActive]: drawer.type === EDrawerType.INFORMATION_ROOM && drawer.isOpen,
              })}
              onClick={() => {
                setDrawer(EDrawerType.INFORMATION_ROOM);
              }}
            >
              <InfoIcon />
            </IconButton>

            <IconButton
              className={classNames(classes.actionRight)}
              onClick={() => {
                setDrawer(EDrawerType.CHAT);
              }}
            >
              {drawer.type === EDrawerType.CHAT && drawer.isOpen ? (
                <ChatActiveIcon />
              ) : (
                <Badge badgeContent={cntMessageUnRead !== 0 ? cntMessageUnRead : ""}>
                  <ChatIcon />
                </Badge>
              )}
            </IconButton>

            <IconButton
              className={classNames(classes.actionRight, {
                [classes.actionRightActive]: drawer.type === EDrawerType.ACTIVITIES && drawer.isOpen,
              })}
              onClick={() => {
                setDrawer(EDrawerType.ACTIVITIES);
              }}
            >
              <CategoriesIcon />
            </IconButton>
            <Box component="div" marginRight={2}></Box>
          </Grid>
        </Grid>
      </Box>

      <BaseDialog open={isLeaveRoom} onClose={() => setIsLeaveRoom(false)} className={classes.dialogLeave}>
        <div className={classes.leaveRoom}>
          <Typography className={classes.title}> End the livestream</Typography>
          <Typography variant="body1" className={classes.content}>
            Are you sure you want to end the livestream?
          </Typography>
        </div>
        <div className={classes.btnAction}>
          <Button variant="contained" className={classes.cancel} onClick={() => setIsLeaveRoom(false)}>
            No
          </Button>
          <Button variant="contained" onClick={outRoomHandler}>
            Yes
          </Button>
        </div>
      </BaseDialog>
    </Container>
  );
};

export default LSStreamer;
