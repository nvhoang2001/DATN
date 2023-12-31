export enum CodeError {
  SUCCESS = "00",
  GENERAL_ERROR = "99",
  BAD_REQUEST = "01",
  EMAIL_INVALID = "02",
  EMAIL_EXISTED = "03",
  INVALID_USERNAME_FORMAT = "04",
  INVALID_PASSWORD_FORMAT = "05",
  ROOM_NOT_EXISTED = "06",
  NAME_IS_TOO_LONG = "07",
  DATE_STRING_INVALID = "08",
  EMAIL_IS_NOT_EMPTY = "09",
  NAME_IS_NOT_EMPTY = "10",
  NAME_IS_NOT_STRING = "11",
  PASSWORD_IS_NOT_EMPTY = "12",
  PASSWORD_IS_NOT_STRING = "13",
  AVATAR_IS_NOT_STRING = "14",
  DESCRIPTION_IS_NOT_STRING = "15",
  ADDRESS_IS_NOT_STRING = "16",
  GENDER_INVALID = "17",
  INVALID_PHONE_NUMBER_FORMAT = "18",
  ADDRESS_IS_TOO_LONG = "19",
  DESCRIPTION_IS_TOO_LONG = "20",
  INVALID_AVATAR = "21",
  FILE_SIZE_TOO_LARGE = "22",
  LIVESTREAM_ROOM_ENDED = "29",
  MEETING_ROOM_CANCELLED = "30",
  CAN_NOT_CANCEL_LIVE_ROOM = "31",
}
