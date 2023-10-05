import {
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
import React, { useEffect, useRef, useState } from "react";
import { MultiEmailInput } from "@/components/common/MultiEmailInput";
import { useStyles } from "./styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MESSAGE } from "@/constants/message";
import CustomTimePicker from "@/components/common/TimePicker";
import { useLSSchedule } from "./useLSSchedule";
import moment from "moment";
import { CloseIcon, UploadIcon, InfoIcon1, CopyActiveIcon } from "@/assets";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "@/constants/path";
import classNames from "classnames";
import ConfirmEmail from "@/components/common/confirm-email";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LSSchedule: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    isRemoveLSSchedule,
    isOpenSendMail,
    isCancelMail,
    roomId,
    isUpdateMode,
    lsScheduleFormik,
    categories,
    scheduleStartTime,
    inputtingEmail,
    isViewMode,
    setIsViewMode,
    handleUploadThumbnail,
    updateStartTime,
    handleDeleteLSSchedule,
    setIsRemoveLSSchedule,
    setIsCancelMail,
    setIsOpenSendMail,
    handleSendMail,
  } = useLSSchedule();
  const timeoutRef = useRef<number | undefined>();

  const updateDate = lsScheduleFormik.handleChange("date");

  const [linkCopy, setLinkToClipBoard] = useState({
    value: "",
    copy: false,
    error: "",
  });

  const handleOnCopy = () => {
    setLinkToClipBoard((pre) => ({ ...pre, copy: true }));

    timeoutRef.current = window.setTimeout(() => {
      setLinkToClipBoard((pre) => ({ ...pre, copy: false }));
    }, 1000);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutRef.current]);

  return (
    <>
      <Card elevation={4} className={classes.lsSchedule}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} textAlign="center" className={classes.title}>
            {isUpdateMode ? "You have successfully scheduled a livestream!" : "Schedule a livestream"}
          </Typography>
          <Grid
            container
            spacing={2}
            component="form"
            className={classes.formContainer}
            onSubmit={(e) => {
              e.preventDefault();
              lsScheduleFormik.handleSubmit();
              setIsOpenSendMail(true);
            }}
          >
            <Grid item md={12}>
              <InputLabel htmlFor="name" sx={{ padding: "5px 0" }} required>
                Room’s name
              </InputLabel>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                name="name"
                disabled={isViewMode && isUpdateMode}
                value={lsScheduleFormik.values.name}
                onChange={lsScheduleFormik.handleChange}
                onBlur={lsScheduleFormik.handleBlur}
                autoComplete="off"
                error={!!lsScheduleFormik.errors.name && !!lsScheduleFormik.touched.name}
                helperText={!!lsScheduleFormik.touched.name && lsScheduleFormik.errors.name}
              />
            </Grid>

            <Grid item md={6}>
              <InputLabel htmlFor="date" required>
                Date
              </InputLabel>
              <DatePicker
                className={classes.date}
                format="DD/MM/YYYY"
                value={lsScheduleFormik.values.date ? moment(lsScheduleFormik.values.date) : null}
                onChange={(value: moment.Moment | null) => {
                  value ? updateDate(moment(value).format("YYYY-MM-DD")) : updateDate("");
                }}
                slotProps={{
                  textField: {
                    id: "date",
                    name: "date",
                    error: !!lsScheduleFormik.errors.date && !!lsScheduleFormik.touched.date,
                    helperText: !!lsScheduleFormik.touched.date && lsScheduleFormik.errors.date,
                  },
                }}
                disabled={isViewMode && isUpdateMode}
                disablePast
              />
            </Grid>

            <Grid item md={6}>
              <InputLabel id="startTime" required>
                Start time
              </InputLabel>
              <CustomTimePicker
                value={scheduleStartTime}
                disabled={isViewMode && isUpdateMode}
                popupLayoutClassname={classes.timePicker}
                activeAMClassNames={classes.timePickerActivingAM}
                activePMClassNames={classes.timePickerActivingPM}
                popupToolbarClassname={classes.timePickerToolbar}
                inputProps={{
                  name: "startTime",
                  error: !!lsScheduleFormik.errors.startTime && !!lsScheduleFormik.touched.startTime,
                  helperText: !!lsScheduleFormik.touched.startTime && lsScheduleFormik.errors.startTime,
                  onBlur: lsScheduleFormik.handleBlur,
                }}
                onChange={updateStartTime}
              />
            </Grid>

            <Grid item md={12}>
              <InputLabel htmlFor="guest" sx={{ padding: "5px 0" }}>
                <span style={{ marginRight: "5px" }}>Guest</span>
                <Tooltip title={MESSAGE.MS_24} placement="top" classes={{ tooltip: classes.tooltip }}>
                  <InfoIcon1 />
                </Tooltip>
              </InputLabel>

              <MultiEmailInput
                id="invitedEmails"
                name="invitedEmails"
                disabled={isViewMode && isUpdateMode}
                placeholder="Type guest's email here, press Enter after each email"
                initialInputValue={inputtingEmail}
                emails={lsScheduleFormik.values.invitedEmails}
                error={
                  (!!lsScheduleFormik.touched.invitedEmails && !!lsScheduleFormik.errors.invitedEmails) ||
                  (!!lsScheduleFormik.touched.tempEmail && !!lsScheduleFormik.errors.tempEmail)
                }
                helperText={
                  !!lsScheduleFormik.touched.invitedEmails &&
                  (lsScheduleFormik.errors.tempEmail || lsScheduleFormik.errors.invitedEmails)
                }
                inputProps={{
                  maxLength: 500,
                }}
                getLabel={(email, index, removeEmail) => {
                  return (
                    <Chip
                      className={classes.emailTag}
                      key={index}
                      label={email}
                      onDelete={() => removeEmail(index)}
                      deleteIcon={
                        <IconButton disabled={isViewMode && isUpdateMode}>
                          <CloseIcon />
                        </IconButton>
                      }
                    />
                  );
                }}
                onChange={(emails) => {
                  lsScheduleFormik.setFieldValue("invitedEmails", emails, true).then(() => {
                    lsScheduleFormik.setFieldTouched("invitedEmails", true);
                  });
                }}
                onBlur={(ev) => {
                  lsScheduleFormik.handleBlur(ev);
                  lsScheduleFormik
                    .setTouched({
                      invitedEmails: true,
                      tempEmail: true,
                    })
                    .then(() => {
                      if (inputtingEmail) {
                        lsScheduleFormik.validateField("tempEmail");
                      }
                    });
                }}
                onChangeInput={(tempEmail) => {
                  lsScheduleFormik.setFieldValue("tempEmail", tempEmail).then(() => {
                    lsScheduleFormik.setErrors({ tempEmail: undefined, invitedEmails: undefined });
                  });
                }}
              />
            </Grid>

            <Grid item md={6}>
              <InputLabel htmlFor="category" sx={{ padding: "5px 0" }}>
                Category <span className={classes.note}>*</span>
                <Tooltip title={MESSAGE.MS_25} placement="top" classes={{ tooltip: classes.tooltip }}>
                  <InfoIcon1 />
                </Tooltip>
              </InputLabel>
              <Select
                options={categories}
                isMulti
                value={lsScheduleFormik.values.categories.map((el) => ({ label: el, value: el }))}
                isDisabled={isViewMode && isUpdateMode}
                placeholder="Select category"
                className={`${classes.category} ${
                  !!lsScheduleFormik.touched.categories && lsScheduleFormik.errors.categories && classes.categoryError
                }`}
                name="categories"
                classNamePrefix="select"
                onChange={(value) => {
                  const tempCategory = value.map((el) => el.value);
                  lsScheduleFormik.setFieldValue("categories", tempCategory);
                }}
                onBlur={() => lsScheduleFormik.setFieldTouched("categories", true)}
              />
              {lsScheduleFormik.errors.categories && lsScheduleFormik.touched.categories && (
                <span className={classes.errorText}> {lsScheduleFormik.errors.categories}</span>
              )}
            </Grid>

            <Grid item md={6}>
              <InputLabel sx={{ padding: "5px 0" }}>Thumbnail</InputLabel>
              <div className={`${classes.thumbnail} ${lsScheduleFormik.errors.files && classes.errorFiles}`}>
                <input
                  type="file"
                  id="upload-file"
                  name="files"
                  onChange={handleUploadThumbnail}
                  hidden
                  disabled={isViewMode && isUpdateMode}
                />
                {lsScheduleFormik.values.thumbnail && (
                  <div className={classes.imgName}>
                    {isUpdateMode && !lsScheduleFormik.values.files ? (
                      <Link to={lsScheduleFormik.values.thumbnail} target="_blank">
                        {lsScheduleFormik.values.thumbnail}
                      </Link>
                    ) : (
                      <>{lsScheduleFormik.values.thumbnail}</>
                    )}
                  </div>
                )}
                <label htmlFor="upload-file" className={classes.text}>
                  <UploadIcon />
                </label>
              </div>

              {lsScheduleFormik.errors.files && (
                <span className={classes.errorText}> {lsScheduleFormik.errors.files}</span>
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
                disabled={isViewMode && isUpdateMode}
                placeholder=""
                name="description"
                value={lsScheduleFormik.values.description}
                onChange={lsScheduleFormik.handleChange}
                onBlur={lsScheduleFormik.handleBlur("description")}
                autoComplete="off"
                error={!!lsScheduleFormik.errors.description}
                helperText={lsScheduleFormik.errors.description}
              />
            </Grid>

            {isUpdateMode && (
              <Grid item md={12}>
                <Typography>
                  <Typography fontWeight={700} component="span">
                    Livestream’s link
                  </Typography>{" "}
                  <CopyToClipboard
                    text={`${window.location.origin}/livestream/waiting-room/${roomId}`}
                    onCopy={handleOnCopy}
                  >
                    <Tooltip
                      title={"Copied!"}
                      open={linkCopy.copy}
                      placement="top"
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                    >
                      <span className={classes.linkCopy}>
                        Link <CopyActiveIcon />
                      </span>
                    </Tooltip>
                  </CopyToClipboard>
                </Typography>
              </Grid>
            )}

            {isUpdateMode && isViewMode ? (
              <Grid item md={12} className={classes.editButton}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsViewMode(false);
                  }}
                >
                  Edit
                </Button>
              </Grid>
            ) : (
              <Grid item md={12} className={classes.groupButton}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classNames(classes.button, classes.cancelButton)}
                  onClick={() => navigate(Paths.LiveStream)}
                >
                  <Typography fontWeight={700}>Cancel</Typography>
                </Button>
                {isUpdateMode && (
                  <Button
                    fullWidth
                    variant="contained"
                    className={classNames(classes.button, classes.removeButton)}
                    onClick={() => {
                      setIsRemoveLSSchedule(true);
                    }}
                  >
                    Remove
                  </Button>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!(lsScheduleFormik.dirty && lsScheduleFormik.isValid)}
                >
                  <Typography fontWeight={700}>{isUpdateMode ? "Update" : "Schedule"}</Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <ConfirmEmail
        isOpen={isOpenSendMail}
        onClose={() => setIsOpenSendMail(false)}
        title={isUpdateMode ? "Send notification email" : "Send invitation email"}
        content={
          isUpdateMode
            ? "Would you like to send notification emails to guests?"
            : "Would you like to send invitation emails to guests?"
        }
        onCancel={() => handleSendMail(false)}
        onSubmit={() => handleSendMail(true)}
      />

      <ConfirmEmail
        isOpen={isRemoveLSSchedule}
        title="Remove a livestream"
        content="Would you like to remove this livestream from the system?"
        onClose={() => setIsRemoveLSSchedule(false)}
        onCancel={() => setIsRemoveLSSchedule(false)}
        onSubmit={() => {
          setIsRemoveLSSchedule(false);
          setIsCancelMail(true);
        }}
      />

      <ConfirmEmail
        isOpen={isCancelMail}
        title="Send cancellation email"
        content="Would you like to send cancellation emails to guests?"
        onClose={() => setIsCancelMail(false)}
        onCancel={() => {
          setIsCancelMail(false);
          handleDeleteLSSchedule(roomId || "", false);
        }}
        onSubmit={() => handleDeleteLSSchedule(roomId || "", true)}
      />
    </>
  );
};

export default LSSchedule;
