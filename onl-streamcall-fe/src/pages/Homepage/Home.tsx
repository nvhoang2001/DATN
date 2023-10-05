import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStyle } from "./styles";
import { useInvite } from "@/hooks/use-invite";
import { MESSAGE } from "@/constants/message";
import { REGEX } from "@/constants/regex";

const Home: React.FC = () => {
  const classes = useStyle();

  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const { joinMeeting } = useInvite();

  const handleOnChange = (e: any) => {
    setRoomId(e.target.value);
    setError("");
  };
  const handleJoinMeeting = async () => {
    await joinMeeting(roomId);
  };

  const handleBlur = () => {
    const ruleName = REGEX.ONLY_NUMBER_CHARACTERS_SPACE;
    if (roomId.trim() === "") {
      setError(MESSAGE.MS_1);
    } else if (!ruleName.test(roomId)) {
      setError(MESSAGE.MS_7);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography className={classes.title} variant="h3" fontWeight={800}>
          Welcome to <br /> Onl Stream Call
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.link} variant="h6" fontWeight={400} fontSize={"1.125rem"} marginBottom={"12px"}>
          New to this app? <Link to="/register">Sign up</Link>
        </Typography>
        <Typography className={classes.link} variant="h6" fontWeight={400} fontSize={"1.125rem"}>
          Already a member? <Link to="/login">Sign in</Link>
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h6" fontWeight={400} fontSize={"1.125rem"} color={"#000000"}>
          Join a meeting now:{" "}
        </Typography>
        <Box className={classes.form}>
          <TextField
            value={roomId}
            onChange={handleOnChange}
            margin="normal"
            fullWidth
            required
            id="roomID"
            name="roomID"
            placeholder="Enter meeting ID"
            autoComplete="off"
            helperText={error}
            error={!!error}
            onBlur={handleBlur}
            className={classes.input}
          />
          <Button className={classes.button} variant="contained" onClick={handleJoinMeeting} disabled={!roomId}>
            <Typography fontWeight={800} variant="h6">
              Join
            </Typography>
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Home;
