import { ReactNode, useEffect, useState } from "react";
import { useFormik } from "formik";
import { LiveStreamValidate } from "./useValidateForm";
import { createLiveStream, getListCategories } from "@/api/livestream";
import { useNavigate } from "react-router-dom";
import { Categories } from "@/interfaces/type";

interface ICreateLiveStreamForm {
  roomName: string;
  emails: string[];
  category: string[];
  thumbnail: string;
  files: ReactNode;
  description: string;
}

export const useCreateLiveStream = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [data, setData] = useState<ICreateLiveStreamForm>({
    roomName: "",
    emails: [],
    category: [],
    thumbnail: "",
    files: null,
    description: "",
  });
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (value: any) => {
    try {
      setIsLoading(true);
      const listCategory = value.category.map((el: any) => {
        return el.value;
      });
      const formdata = new FormData();

      formdata.append("name", value.roomName);
      formdata.append("hasSendMail", value.hasSendMail);
      for (let i = 0; i < listCategory.length; i++) {
        formdata.append(`listCategory[${i}]`, listCategory[i]);
      }
      if (value.files) formdata.append("thumbnail", value.files);
      if (value.description) formdata.append("description", value.description);

      for (let i = 0; i < value.emails.length; i++) {
        formdata.append(`invitedEmails[${i}]`, value.emails[i]);
      }

      const res = await createLiveStream(formdata);
      if (res.status === 201 || res.status === 200) {
        navigate(`/livestream/waiting-room/${res.data.id}`);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmEmail = (isSend: boolean) => {
    const body = { ...data, hasSendMail: isSend };
    handleSubmitForm(body);
  };

  const liveStreamFormik = useFormik<ICreateLiveStreamForm & { tempEmail?: string }>({
    initialValues: {
      roomName: "",
      emails: [],
      category: [],
      thumbnail: "",
      files: null,
      description: "",
      tempEmail: "",
    },
    validationSchema: LiveStreamValidate,
    onSubmit: (values) => {
      setData(values);
      setIsOpenConfirm(true);
    },
  });

  useEffect(() => {
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
    handleGetListCategories();
  }, []);

  return {
    liveStreamFormik,
    isLoading,
    categories,
    setIsOpenConfirm,
    isOpenConfirm,
    handleConfirmEmail,
    inputtingEmail: liveStreamFormik.values.tempEmail,
  };
};
