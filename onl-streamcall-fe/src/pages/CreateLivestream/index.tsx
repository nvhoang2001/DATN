import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";
import { useCreateLiveStream } from "./useCreateLivestream";
import "react-multi-email/dist/style.css";
import Select from "react-select";
import { ReactComponent as InfoIcon } from "@/assets/svg/info-circle-1.svg";
import { ReactComponent as UploadIcon } from "@/assets/svg/upload.svg";
import { CloseIcon } from "@/assets";

import { MESSAGE } from "@/constants/message";
import ConfirmEmail from "@/components/common/confirm-email";
import { MultiEmailInput } from "@/components/common/MultiEmailInput";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/constants/path";

const CreateLiveStream = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { liveStreamFormik, categories, isOpenConfirm, setIsOpenConfirm, handleConfirmEmail, inputtingEmail } =
    useCreateLiveStream();

  const handOnChangeCategory = (value: any) => {
    liveStreamFormik.setFieldValue("category", value);
  };

  const handleUploadThumbnail = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      liveStreamFormik.setFieldValue("thumbnail", "");
      liveStreamFormik.setFieldValue("files", undefined);
      return;
    }

    const isImage = e.target.files[0].type.split("/").some((el: string) => {
      const type = ["jpg", "jpeg", "png", "gif"];
      return type.includes(el);
    });

    if (e.target.files[0].size > 5120000) {
      liveStreamFormik.setErrors({ files: MESSAGE.MS_3 });
    } else if (!isImage) {
      liveStreamFormik.setErrors({ files: MESSAGE.MS_4 });
    } else {
      liveStreamFormik.setErrors({ files: "" });
      liveStreamFormik.setFieldValue("thumbnail", e.target.files[0].name);
      liveStreamFormik.setFieldValue("files", e.target.files[0]);
    }
  };

  return (
    <Card elevation={4} className={classes.createLiveStream}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} textAlign="center" className={classes.title}>
          Start an instant livestream room
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              {" "}
              <InputLabel htmlFor="roomName" sx={{ padding: "5px 0" }}>
                Room’s name <span className={classes.note}>*</span>{" "}
              </InputLabel>
              <TextField
                id="roomName"
                variant="outlined"
                fullWidth
                name="roomName"
                autoFocus
                value={liveStreamFormik.values.roomName}
                onChange={liveStreamFormik.handleChange}
                onBlur={liveStreamFormik.handleBlur}
                autoComplete="off"
                error={!!liveStreamFormik.errors.roomName && !!liveStreamFormik.touched.roomName}
                helperText={!!liveStreamFormik.touched.roomName && liveStreamFormik.errors.roomName}
              />
            </Grid>

            <Grid item md={12}>
              <InputLabel htmlFor="guest" sx={{ padding: "5px 0" }}>
                <span style={{ marginRight: "5px" }}> Guest</span>
                <Tooltip title={MESSAGE.MS_24} placement="top" classes={{ tooltip: classes.tooltip }}>
                  <InfoIcon />
                </Tooltip>
              </InputLabel>

              <MultiEmailInput
                id="emails"
                name="emails"
                placeholder="Type guest's email here, press Enter after each email"
                initialInputValue={inputtingEmail}
                emails={liveStreamFormik.values.emails}
                error={
                  (!!liveStreamFormik.touched.emails && !!liveStreamFormik.errors.emails) ||
                  (!!liveStreamFormik.touched.tempEmail && !!liveStreamFormik.errors.tempEmail)
                }
                helperText={
                  !!liveStreamFormik.touched.emails &&
                  (liveStreamFormik.errors.tempEmail || liveStreamFormik.errors.emails)
                }
                inputProps={{
                  maxLength: 254,
                }}
                getLabel={(email, index, removeEmail) => {
                  return (
                    <Chip
                      className={classes.emailTag}
                      key={index}
                      label={email}
                      onDelete={() => removeEmail(index)}
                      deleteIcon={
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      }
                    />
                  );
                }}
                onChange={(emails) => {
                  liveStreamFormik.setFieldValue("emails", emails, true).then(() => {
                    liveStreamFormik.setFieldTouched("emails", true);
                  });
                }}
                onBlur={(ev) => {
                  liveStreamFormik.handleBlur(ev);
                  liveStreamFormik
                    .setTouched({
                      emails: true,
                      tempEmail: true,
                    })
                    .then(() => {
                      if (inputtingEmail) {
                        liveStreamFormik.validateField("tempEmail");
                      }
                    });
                }}
                onChangeInput={(tempEmail) => {
                  liveStreamFormik.setFieldValue("tempEmail", tempEmail).then(() => {
                    liveStreamFormik.setErrors({ tempEmail: undefined, emails: undefined });
                  });
                }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel htmlFor="category" sx={{ padding: "5px 0" }}>
                Category <span className={classes.note}>*</span>
                <Tooltip title={MESSAGE.MS_25} placement="top" classes={{ tooltip: classes.tooltip }}>
                  <InfoIcon />
                </Tooltip>
              </InputLabel>
              <Select
                options={categories}
                isMulti
                placeholder="Select category"
                className={`${classes.category} ${
                  !!liveStreamFormik.touched.category && liveStreamFormik.errors.category && classes.categoryError
                }`}
                classNamePrefix="select"
                onChange={handOnChangeCategory}
                onBlur={() => liveStreamFormik.setFieldTouched("category", true)}
              />
              {liveStreamFormik.errors.category && liveStreamFormik.touched.category && (
                <span className={classes.errorText}> {liveStreamFormik.errors.category}</span>
              )}
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ padding: "5px 0" }}>Thumbnail</InputLabel>
              <div className={`${classes.thumbnail} ${liveStreamFormik.errors.files && classes.errorFiles}`}>
                <input type="file" id="upload-file" onChange={handleUploadThumbnail} className={classes.inputFile} />
                <label htmlFor="upload-file" className={classes.text}>
                  {!liveStreamFormik.errors.files && liveStreamFormik.values.thumbnail}
                  <UploadIcon />
                </label>
              </div>

              {liveStreamFormik.errors.files && (
                <span className={classes.errorText}> {liveStreamFormik.errors.files}</span>
              )}
            </Grid>
            <Grid item md={12}>
              <InputLabel htmlFor="description" sx={{ padding: "5px 0" }}>
                Description
              </InputLabel>
              <TextField
                id="description"
                variant="outlined"
                fullWidth
                placeholder=""
                name="description"
                value={liveStreamFormik.values.description}
                onChange={liveStreamFormik.handleChange}
                onBlur={liveStreamFormik.handleBlur("description")}
                autoComplete="off"
                error={!!liveStreamFormik.errors.description}
                helperText={liveStreamFormik.errors.description}
              />
            </Grid>
            <Grid item md={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className={classes.cancel}
                onClick={() => navigate(Paths.LiveStream)}
              >
                <Typography fontWeight={700}>Cancel</Typography>
              </Button>
            </Grid>
            <Grid item md={6}>
              {" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  liveStreamFormik.handleSubmit();
                }}
                disabled={!(liveStreamFormik.dirty && liveStreamFormik.isValid)}
              >
                <Typography fontWeight={700}>Go Live</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <ConfirmEmail
        isOpen={isOpenConfirm}
        onCancel={() => {
          handleConfirmEmail(false);
        }}
        content="Would you like to send invitation emails to guests?"
        onSubmit={() => handleConfirmEmail(true)}
        onClose={() => setIsOpenConfirm(false)}
      />
    </Card>
  );
};
export default CreateLiveStream;
