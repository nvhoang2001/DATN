import React, { useEffect } from "react";
import { useStyles } from "./styles";
import UserView from "@/components/Views/WaitingRoom/UserView/";
import useLSWaitingRoom from "./useLSWaitingRoom";
import { Button, IconButton, Typography } from "@mui/material";
import classNames from "classnames";
import { ReactComponent as Microphone } from "@/assets/svg/microphone.svg";
import { ReactComponent as MicrophoneOff } from "@/assets/svg/microphone-slash.svg";
import { ReactComponent as VideocamIcon } from "@/assets/svg/video.svg";
import { ReactComponent as VideocamOffIcon } from "@/assets/svg/video-slash.svg";

const LSWaitingRoom: React.FC = () => {
  const classes = useStyles();
  const {
    roomClient,
    roomId,
    user,
    micState,
    webcamState,
    videoVisible,
    videoTracks,
    audioTracks,
    microphoneList,
    speakerList,
    webcamList,
    isDisconnectedToRoom,
    micStateToggleHandler,
    webcamStateToggleHandler,
    updateDisplayNameHandler,
    joinLivestreamHanler,
    cancelJoinLivestream,
    tryReconnectToLivestreamRoom,
    checkLSRoomExits,
  } = useLSWaitingRoom();

  useEffect(() => {
    if (roomId && roomClient) {
      checkLSRoomExits(roomId, roomClient);
    }
  }, [roomId, checkLSRoomExits, roomClient]);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.videoContainer}>
          <UserView
            displayName={user.displayName || ""}
            audioTrack={audioTracks}
            videoTrack={videoTracks}
            microphones={microphoneList || []}
            webcams={webcamList || []}
            speakers={speakerList || []}
            videoVisible={videoVisible}
            audioMuted={micState !== "on"}
            onChangeDisplayName={updateDisplayNameHandler}
          />

          <div className={classes.actionsContainer}>
            <IconButton
              className={classNames({ "media-off": micState === "off" })}
              disabled={micState === "unsupported"}
              onClick={micStateToggleHandler}
            >
              {micState === "off" ? <MicrophoneOff /> : <Microphone />}
            </IconButton>

            <IconButton
              className={classNames({ "media-off": webcamState === "off" })}
              disabled={webcamState === "unsupported"}
              onClick={webcamStateToggleHandler}
            >
              {webcamState === "off" ? <VideocamOffIcon /> : <VideocamIcon />}
            </IconButton>
          </div>
        </div>

        <div className={classes.right}>
          <Typography component="h1" variant="h4" align="center" fontWeight={800}>
            Waiting Room
          </Typography>
          <Typography component="h6"> Ready to start livestream?</Typography>

          <div className={classes.action}>
            <Button variant="contained" onClick={cancelJoinLivestream} className={classes.cancel}>
              Cancel
            </Button>

            {isDisconnectedToRoom ? (
              <Button variant="contained" onClick={tryReconnectToLivestreamRoom}>
                Try Reconnect
              </Button>
            ) : (
              <Button variant="contained" onClick={joinLivestreamHanler}>
                Start Livestream
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LSWaitingRoom;
