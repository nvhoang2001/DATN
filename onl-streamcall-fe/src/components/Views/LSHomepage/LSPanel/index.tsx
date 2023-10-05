import { Avatar, Card, CardContent, CardMedia, Chip, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, PlayIcon } from "@/assets";
import { calculateTimeLivestream, convertNumberViewer, getImageThumbnail } from "@/utils";
import Timestamp from "@/components/common/Timestamp";
import { ELIVESTREAM_STATUS } from "@/constants";
import { IProfile } from "@/interfaces/type";

interface ILSPanel {
  id: string;
  title?: string;
  tags: String[];
  label: string;
  peersCount: number;
  thumbnail?: string;
  startTime?: string;
  creator?: IProfile;
}

const LSPanel: React.FC<ILSPanel> = ({ title, id, tags, label, startTime, peersCount, creator, thumbnail }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentTimeLive, setCurrentTimeLive] = useState<string>("");

  useEffect(() => {
    const id = setInterval(() => {
      if (startTime) setCurrentTimeLive(calculateTimeLivestream(startTime));
    }, 1000);

    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={classes.boxLSPanel}>
      <div
        className={classNames(classes.tag, {
          [classes.comingSoon]: label === ELIVESTREAM_STATUS.COMMING_SOON,
          [classes.tagLive]: label === ELIVESTREAM_STATUS.LIVE,
        })}
      >
        <Typography variant="body2" className={`${label === ELIVESTREAM_STATUS.LIVE && classes.live}`}>
          {label === ELIVESTREAM_STATUS.LIVE ? "Live" : "Coming soon"}
        </Typography>
        {label === ELIVESTREAM_STATUS.LIVE && (
          <div className={classes.viewer}>
            <EyeIcon />
            <Typography variant="body2">{convertNumberViewer(peersCount)}</Typography>
          </div>
        )}
      </div>
      <div className={classes.bg} onClick={() => navigate(`/livestream/viewer/${id}`)}>
        <CardMedia
          className={classNames(classes.lsPanelImg, { [classes.lsPanelImgHover]: label === ELIVESTREAM_STATUS.LIVE })}
          sx={{ height: 253 }}
          image={getImageThumbnail(thumbnail)}
        />

        <PlayIcon className={classes.icon} />
      </div>

      <CardContent>
        <Tooltip title={title}>
          <Link to={`/livestream/viewer/${id}`}>
            <Typography className={classNames(classes.mainColor, classes.title)} fontWeight={800}>
              {title}
            </Typography>
          </Link>
        </Tooltip>
        {tags?.length > 0 && (
          <Stack direction="row" spacing={1} mt={2} useFlexGap flexWrap="wrap">
            {tags.map((tag, idx) => (
              <Chip key={idx} label={tag} className={classes.chip} />
            ))}
          </Stack>
        )}
        <Stack direction="row" spacing={1} mt={1} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            {" "}
            <Avatar sx={{ width: 36, height: 36 }} src={getImageThumbnail(creator?.avatar)} />
            <Typography className={classNames(classes.mainColor)} fontWeight={700}>
              {creator && creator.fullname}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            mt={1}
            alignItems="center"
            justifyContent="flex-end"
            className={classes.time}
          >
            {" "}
            {label === ELIVESTREAM_STATUS.LIVE ? (
              <Typography variant="body1" fontSize={12}>
                {currentTimeLive}
              </Typography>
            ) : (
              <Timestamp border type time={startTime} />
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LSPanel;
