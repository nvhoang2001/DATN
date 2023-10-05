import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Badge, Box, Button, Card, CardContent, Container, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { useLSViewer } from "./useLSViewer";
import Timestamp from "@/components/common/Timestamp";
import { HandIcon, EmojiIcon, SettingIcon, InfoIcon, ChatIcon, CategoriesIcon, ChatActiveIcon } from "@/assets";
import classNames from "classnames";
import { EDrawerType } from "@/interfaces/type";
import PeerView from "@/components/Views/VideoCall/PeerView";
import { useAppSelector } from "@/hooks";
import Chat from "@/components/Views/VideoCall/BoxDrawer/Chat";
import Activities from "@/components/Views/VideoCall/BoxDrawer/Activities";
import { BaseDialog } from "@/components/common/base-dialog";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/constants/path";
import LSInfomation from "@/components/Views/LSRoom/LSInformation";

const LSViewer: React.FC = () => {
  const classes = useStyles();
  const {
    livestreamDetail,
    roomClient,
    roomId,
    drawer,
    cntMessageUnRead,
    audioConsumer,
    videoConsumer,
    audioMuted,
    faceDetection,
    videoVisible,
    setDrawer,
    showMessageCommingsoon,
    checkLSRoomExits,
    leaveLSRoom,
    closeDrawer,
  } = useLSViewer();
  const isJoin = React.useRef(false);

  const { isLogged } = useAppSelector((state) => state.auth);
  const [isOpenPermissPopup, setIsOpenPermissPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (roomClient !== undefined && roomId) {
      if (!isJoin.current) {
        isJoin.current = true;
        roomClient?.viewerJoinLivestream(roomId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomClient, roomId]);

  useEffect(() => {
    if (roomId) {
      checkLSRoomExits(roomId);
    }
  }, [roomId, checkLSRoomExits]);

  const renderDrawerContent = () => {
    switch (drawer.type) {
      case EDrawerType.INFORMATION_ROOM:
        return <LSInfomation onClose={closeDrawer} />;
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
          <PeerView
            isLivestream
            peer={{ displayName: livestreamDetail.creator?.fullname }}
            avatarUrl={`${process.env.REACT_APP_API_BASE_URL}/${livestreamDetail.creator?.avatar}`}
            audioConsumerId={audioConsumer ? audioConsumer.id : null}
            videoConsumerId={videoConsumer ? videoConsumer.id : null}
            audioRtpParameters={audioConsumer ? audioConsumer.rtpParameters : null}
            videoRtpParameters={videoConsumer ? videoConsumer.rtpParameters : null}
            consumerSpatialLayers={videoConsumer ? videoConsumer.spatialLayers : null}
            consumerTemporalLayers={videoConsumer ? videoConsumer.temporalLayers : null}
            consumerCurrentSpatialLayer={videoConsumer ? videoConsumer.currentSpatialLayer : null}
            consumerCurrentTemporalLayer={videoConsumer ? videoConsumer.currentTemporalLayer : null}
            consumerPreferredSpatialLayer={videoConsumer ? videoConsumer.preferredSpatialLayer : null}
            consumerPreferredTemporalLayer={videoConsumer ? videoConsumer.preferredTemporalLayer : null}
            consumerPriority={videoConsumer ? videoConsumer.priority : null}
            audioTrack={audioConsumer ? audioConsumer.track : null}
            videoTrack={videoConsumer ? videoConsumer.track : null}
            audioMuted={audioMuted}
            videoVisible={videoVisible}
            videoMultiLayer={videoConsumer && videoConsumer.type !== "simple"}
            audioCodec={audioConsumer ? audioConsumer.codec : null}
            videoCodec={videoConsumer ? videoConsumer.codec : null}
            audioScore={audioConsumer ? audioConsumer.score : null}
            videoScore={videoConsumer ? videoConsumer.score : null}
            faceDetection={faceDetection}
          />
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
            <IconButton onClick={() => showMessageCommingsoon()}>
              <HandIcon />
            </IconButton>
            <IconButton onClick={() => showMessageCommingsoon()}>
              <EmojiIcon />
            </IconButton>
            <IconButton onClick={() => showMessageCommingsoon()}>
              <SettingIcon />
            </IconButton>
            <Button variant="contained" className="end-call" onClick={leaveLSRoom}>
              <Typography>Leave</Typography>
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
              className={classNames(classes.actionRight, {
                [classes.actionRightActive]:
                  (drawer.type === EDrawerType.CHAT && drawer.isOpen) || cntMessageUnRead > 0,
              })}
              onClick={() => {
                if (isLogged) {
                  setDrawer(EDrawerType.CHAT);
                } else {
                  setIsOpenPermissPopup(true);
                }
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

      <BaseDialog
        open={isOpenPermissPopup}
        onClose={() => setIsOpenPermissPopup(false)}
        className={classes.dialogLeave}
      >
        <div className={classes.permission}>
          <Typography className={classes.title}> Chat Permission</Typography>
          <Typography variant="body1" className={classes.content}>
            You need to sign in in order to send message
          </Typography>
        </div>
        <div className={classes.btnAction}>
          <Button variant="contained" onClick={() => navigate(Paths.Register)}>
            Sign up
          </Button>
          <Button variant="contained" onClick={() => navigate(Paths.Login)}>
            Sign in
          </Button>
        </div>
      </BaseDialog>
    </Container>
  );
};

export default LSViewer;
