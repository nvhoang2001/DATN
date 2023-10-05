import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "./store";
import { authAsyncActions } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { layoutActions } from "@/store/layoutSlice";
import { ISnackbar } from "@/interfaces/type";
import { MESSAGE } from "@/constants/message";
import { ethers } from "ethers";
import { AxiosError } from "axios";
import { notify } from "@/store/thunks/notify";
import { ENOTIFY_TYPE } from "@/constants";
import { Paths } from "@/constants/path";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isNotInstallMetamask = !window.ethereum;

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(MESSAGE.MS_16).required(MESSAGE.MS_1).trim(),
      password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,30}(?:[@$!%*?&])?$/, MESSAGE.MS_13)
        .required(MESSAGE.MS_1)
        .trim(),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await dispatch(authAsyncActions.loginAction(values)).unwrap();
        const params: ISnackbar = {
          isOpen: true,
          message: "Login success!",
          severity: "success",
        };
        dispatch(layoutActions._openSnackbar({ data: params }));
        navigate(Paths.Home);
      } catch (error: any) {
        const params: ISnackbar = {
          isOpen: true,
          message: error.response.data.message,
          severity: "error",
        };
        dispatch(layoutActions._openSnackbar({ data: params }));
      } finally {
        setIsLoading(false);
      }
    },
  });

  const loginWithMetamask = async () => {
    if (isNotInstallMetamask) {
      return;
    }
    try {
      const [walletAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signMessage = await signer.signMessage(process.env.REACT_APP_WALLET_SIGN_MESSAGE || "");

      setIsLoading(true);
      await dispatch(
        authAsyncActions.loginWithMetamask({
          signMessage,
          walletAddress,
        })
      ).unwrap();

      const params: ISnackbar = {
        isOpen: true,
        message: "Login success!",
        severity: "success",
      };
      dispatch(layoutActions._openSnackbar({ data: params }));
      navigate(Paths.Home);
    } catch (error: any) {
      let message = "Server error, please try again";

      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.data.message === "user not exist") {
            message = MESSAGE.MS_32;
          } else {
            message = MESSAGE.MS_8;
          }
        }
      }

      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Please connect to MetaMask.");
        message = "Please sign message to sign in";
      }
      dispatch(notify({ text: message, type: ENOTIFY_TYPE.ERROR }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginFormik,
    isLoading,
    isNotInstallMetamask,
    loginWithMetamask,
  };
};
