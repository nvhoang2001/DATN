import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { CalendarIcon, CloseIcon, FemaleIcon, MaleIcon, PlusIcon } from "@/assets";
import { Stack } from "@mui/material";
import { useLSInformation } from "./useLSInformation";
import { Gender } from "@/interfaces/type";
import moment from "moment";

interface ILSInformation {
  isStreamer?: boolean;
  onClose?: () => void;
}

const LSInformation: React.FC<ILSInformation> = ({ isStreamer = false, onClose }) => {
  const classes = useStyles();
  const { streamer } = useLSInformation();

  return (
    <>
      <Box component="div" height="3rem" className={classes.title}>
        <div></div>
        <CloseIcon onClick={onClose} className={classes.close} />
      </Box>
      <Box component="div" className={classes.boxDrawerContent}>
        <Stack alignItems="center" spacing={1}>
          <Avatar src={`${process.env.REACT_APP_API_BASE_URL}/${streamer?.avatar}`} sx={{ width: 119, height: 119 }} />
          <Typography fontWeight={700} variant="h6">{streamer?.firstname + " " + streamer?.lastname}</Typography>
          <Box component={Stack} direction="row" spacing={1} alignItems="center">
            {streamer?.birthday && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarIcon /> <Typography component="span">{moment(streamer.birthday).format("DD/MM/YYYY")}</Typography>
              </Stack>
            )}
            {streamer?.gender && (
              <>
                <span>•</span>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {streamer.gender !== Gender.OTHER ? (
                    <>
                      {streamer.gender === Gender.MALE ? <MaleIcon /> : <FemaleIcon />}{" "}
                      <Typography component="span">Male</Typography>
                    </>
                  ) : (
                    <Typography component="span">Other</Typography>
                  )}
                </Stack>
              </>
            )}
          </Box>
          {!isStreamer && (
            <Button className={classes.btnFollow} variant="contained" startIcon={<PlusIcon />}>
              Follow
            </Button>
          )}
        </Stack>
        <Box className={classes.description} component="div" mt={5}>
          {streamer?.description}
        </Box>
      </Box>
    </>
  );
};

export default LSInformation;
