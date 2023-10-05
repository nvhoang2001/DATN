import { MESSAGE } from "@/constants/message";
import * as Yup from "yup";
import { isEmail } from "react-multi-email";
export const LiveStreamValidate = Yup.object({
  roomName: Yup.string().max(255, MESSAGE.MS_28).required(MESSAGE.MS_1).trim(),
  description: Yup.string().max(1000, MESSAGE.MS_19),
  category: Yup.array().min(1, MESSAGE.MS_1).max(3, MESSAGE.MS_26),
  tempEmail: Yup.string().test("tempEmail", MESSAGE.MS_16, (value) => (value ? isEmail(value) : true)),
});
