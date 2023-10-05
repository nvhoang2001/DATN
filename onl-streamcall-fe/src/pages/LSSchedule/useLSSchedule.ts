import { useState, useEffect, useMemo, useCallback } from "react";
import { useFormik } from "formik";
import { isEmail } from "react-multi-email";
import moment, { Moment } from "moment";
import * as Yup from "yup";

import { createLiveStream, deleteLSSchedule, getListCategories, updateLiveStream } from "@/api/livestream";
import { MESSAGE } from "@/constants/message";
import { Categories, IFormLSSchedule } from "@/interfaces/type";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { livestreamAsyncActions } from "@/store/livestreamSlice";
import { notify } from "@/store/thunks/notify";
import { Paths } from "@/constants/path";
import { ENOTIFY_TYPE } from "@/constants";
import { CodeError } from "@/constants/codeError";

function calculateClockTimeFromDate(clockTime: string | Moment, date?: string) {
  const time = moment(clockTime);

  if (date) {
    const currentDate = moment(date);
    time.year(currentDate.year()).month(currentDate.month()).date(currentDate.date());
  }

  return time;
}

export const useLSSchedule = () => {
  const [lsScheduleDetail, setLSScheduleDetail] = useState<IFormLSSchedule>({
    id: "",
    name: "",
    date: "",
    startTime: "",
    invitedEmails: [],
    categories: [],
    description: "",
    thumbnail: "",
    files: "",
  });
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoveLSSchedule, setIsRemoveLSSchedule] = useState<boolean>(false);
  const [isCancelMail, setIsCancelMail] = useState<boolean>(false);
  const [isOpenSendMail, setIsOpenSendMail] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>();
  const [isViewMode, setIsViewMode] = useState<boolean>(true);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const dispatch = useAppDispatch();

  const isUpdateMode = !!roomId;

  const lsScheduleFormik = useFormik<Omit<IFormLSSchedule, "id"> & { tempEmail?: string }>({
    enableReinitialize: true,
    initialValues: {
      name: lsScheduleDetail.name && isUpdateMode ? lsScheduleDetail.name : "",
      date: lsScheduleDetail.date && isUpdateMode ? lsScheduleDetail.date : "",
      startTime: lsScheduleDetail.startTime && isUpdateMode ? lsScheduleDetail.startTime : "",
      invitedEmails: lsScheduleDetail.invitedEmails && isUpdateMode ? lsScheduleDetail.invitedEmails : [],
      categories: lsScheduleDetail.categories && isUpdateMode ? lsScheduleDetail.categories : [],
      thumbnail: lsScheduleDetail.thumbnail && isUpdateMode ? lsScheduleDetail.thumbnail : "",
      files: "",
      description: lsScheduleDetail.description && isUpdateMode ? lsScheduleDetail.description : "",
      tempEmail: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255, MESSAGE.MS_28).required(MESSAGE.MS_1).trim(),
      date: Yup.date()
        .min(new Date("1900-01-01T00:00:00.000"), MESSAGE.MS_29)
        .typeError(MESSAGE.MS_29)
        .required(MESSAGE.MS_1),
      startTime: Yup.date().required(MESSAGE.MS_1).typeError(MESSAGE.MS_29).min(new Date(), MESSAGE.MS_31),
      description: Yup.string().max(1000, MESSAGE.MS_19),
      categories: Yup.array().min(1, MESSAGE.MS_1).max(3, MESSAGE.MS_26),
      invitedEmails: Yup.array(),
      tempEmail: Yup.string().test("tempEmail", MESSAGE.MS_16, (value) => (value ? isEmail(value) : true)),
    }),
    validateOnMount: true,
    onSubmit: (values) => {
      const formdata = new FormData();

      const startTime = calculateClockTimeFromDate(values.startTime, values.date).toISOString();

      formdata.append("name", values.name);
      formdata.append("startTime", startTime);

      for (let i = 0; i < values.categories.length; i++) {
        formdata.append(`listCategory[${i}]`, values.categories[i]);
      }
      if (values.files) formdata.append("thumbnail", values.files);
      if (values.description) formdata.append("description", values.description);

      for (let i = 0; i < values.invitedEmails.length; i++) {
        formdata.append(`invitedEmails[${i}]`, values.invitedEmails[i]);
      }

      setFormData(formdata);
    },
  });

  const handleSendMail = (isSend: boolean) => {
    if (!formData) return;
    formData.append("hasSendMail", String(isSend));
    if (isUpdateMode) {
      formData.append("id", roomId);
      handleUpdateLSSchedule(formData);
    } else {
      handleCreateLSSchedule(formData);
    }

    setIsOpenSendMail(false);
  };

  const handleCreateLSSchedule = async (payload: FormData) => {
    try {
      setIsLoading(true);
      const res = await createLiveStream(payload);
      if (res.status === 201 || res.status === 200) {
        navigate(`/livestream/schedule/${res.data.id}`);
      }
      dispatch(
        notify({
          text: "Create successfully!",
          title: "Create Schedule",
        })
      );
    } catch (error) {
      dispatch(
        notify({
          text: "Failed to create!",
          title: "Create schedule",
          type: ENOTIFY_TYPE.ERROR,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLSSchedule = async (payload: FormData) => {
    try {
      setIsLoading(true);
      const res = await updateLiveStream(payload);
      if (res.status === 201 || res.status === 200) {
        setIsViewMode(true);
        if (roomId) handleGetLSScheduleDetail(roomId);
      }
      dispatch(
        notify({
          text: "Update successfully!",
          title: "Update Schedule",
        })
      );
    } catch (error) {
      dispatch(
        notify({
          text: "Failed to update!",
          title: "Update schedule",
          type: ENOTIFY_TYPE.ERROR,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLSSchedule = async (roomId: string, hasSendMail: boolean) => {
    if (!roomId) return;
    setIsLoading(true);
    try {
      await deleteLSSchedule(roomId, hasSendMail);
      dispatch(
        notify({
          text: "Remove successfully!",
          title: "Remove Schedule",
        })
      );

      navigate(Paths.LSRemove);
    } catch (error: any) {
      const code = error?.response?.data?.message;
      if (code === CodeError.LIVESTREAM_ROOM_ENDED) {
        dispatch(
          notify({
            text: "Livestream room ended",
            type: ENOTIFY_TYPE.ERROR,
          })
        );
      } else if (code === CodeError.CAN_NOT_CANCEL_LIVE_ROOM) {
        dispatch(
          notify({
            text: "Cannot cancel livestream room",
            type: ENOTIFY_TYPE.ERROR,
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadThumbnail = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      lsScheduleFormik.setFieldValue("thumbnail", "");
      lsScheduleFormik.setFieldValue("files", undefined);
      return;
    }

    const isImage = e.target.files[0].type.split("/").some((el: string) => {
      const type = ["jpg", "jpeg", "png", "gif"];
      return type.includes(el);
    });

    if (!isImage) {
      lsScheduleFormik.setErrors({ files: MESSAGE.MS_4 });
    } else if (e.target.files[0].size > 5120000) {
      lsScheduleFormik.setErrors({ files: MESSAGE.MS_3 });
    } else {
      lsScheduleFormik.setErrors({ files: "" });
      lsScheduleFormik.setFieldValue("thumbnail", e.target.files[0].name);
      lsScheduleFormik.setFieldValue("files", e.target.files[0]);
    }
  };

  const scheduleStartTime = useMemo(() => {
    return calculateClockTimeFromDate(lsScheduleFormik.values.startTime, lsScheduleFormik.values.date);
  }, [lsScheduleFormik.values.date, lsScheduleFormik.values.startTime]);

  const updateStartTime = useCallback(
    (value: Moment | null) => {
      if (!value) {
        lsScheduleFormik.setFieldValue("startTime", "").then(() => {
          lsScheduleFormik.setFieldTouched("startTime", true);
        });
        return;
      }

      const updatedStartTime = calculateClockTimeFromDate(value, lsScheduleFormik.values.date);

      lsScheduleFormik.setFieldValue("startTime", updatedStartTime.toISOString()).then(() => {
        lsScheduleFormik.setFieldTouched("startTime", true);
      });
    },
    [lsScheduleFormik]
  );

  const handleGetListCategories = async () => {
    const res = await getListCategories();
    const list = res.data.map((el: Categories) => {
      return {
        label: el.name,
        value: el.name,
      };
    });
    setCategories(list);
  };

  const handleGetLSScheduleDetail = useCallback(async (lsScheduleId: string) => {
    try {
      const data = await dispatch(livestreamAsyncActions.checkLSRoomExitsAction(lsScheduleId)).unwrap();
      const { name, startTime, invitedEmails, listCategory, thumbnail, description } = data;
      setLSScheduleDetail({
        name,
        date: startTime,
        startTime: startTime,
        invitedEmails,
        categories: listCategory,
        description,
        thumbnail: thumbnail ? process.env.REACT_APP_API_BASE_URL + "/" + thumbnail : "",
        files: "",
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const errorCode = error?.response?.data?.message;

      if (errorCode === CodeError.LIVESTREAM_ROOM_ENDED) {
        dispatch(
          notify({
            type: ENOTIFY_TYPE.ERROR,
            text: "Livestream room ended",
          })
        );
        navigate(Paths.LiveStream);
      } else if (errorCode === CodeError.ROOM_NOT_EXISTED || status === 404) {
        dispatch(
          notify({
            type: ENOTIFY_TYPE.ERROR,
            text: "Livestream room ID not existed",
          })
        );
        navigate(Paths.LiveStream);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetListCategories();
  }, []);

  useEffect(() => {
    if (roomId) {
      handleGetLSScheduleDetail(roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return {
    roomId,
    isRemoveLSSchedule,
    isCancelMail,
    isOpenSendMail,
    isLoading,
    isUpdateMode,
    categories,
    lsScheduleFormik,
    scheduleStartTime,
    inputtingEmail: lsScheduleFormik.values.tempEmail,
    isViewMode,
    setIsViewMode,
    setIsCancelMail,
    setIsRemoveLSSchedule,
    setIsOpenSendMail,
    updateStartTime,
    handleUploadThumbnail,
    handleDeleteLSSchedule,
    handleSendMail,
  };
};
