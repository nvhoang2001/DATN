import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    lsSchedule: {
      maxWidth: "1000px",
      margin: "0 auto",
      marginTop: "80px",

      "&.MuiPaper-root": {
        borderRadius: 15,
        overflow: "visible",
      },
      "& .MuiCardContent-root": {
        padding: "30px 50px !important",
      },
    },
    note: {
      color: theme.palette.primary.error,
      fontSize: "14px",
      marginRight: 5,
    },
    formContainer: {
      "& > div:not(:last-child)": {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: theme.spacing(0.5),
      },
      "& > div > div": {
        flex: 1,
      },
      "& > div > button": {
        flex: 1,
      },
    },
    title: {
      fontSize: "28px !important",
      color: theme.palette.primary.main,
    },
    tooltip: {
      backgroundColor: `${theme.palette.primary.white} !important`,
      boxShadow: "0px 10px 50px 0px rgba(0, 0, 0, 0.10), 0px 4px 5px 0px rgba(0, 0, 0, 0.05)",
      color: `${theme.palette.primary.main} !important`,
      fontSize: "16px !important",
      padding: "15px !important",
    },
    invalid: {
      "&.react-multi-email": {
        border: `1px solid ${theme.palette.primary.error} !important`,
      },
    },
    emailTag: {
      "&.MuiChip-root": {
        height: "auto",
        borderRadius: "4px",
        border: `1px solid  ${theme.palette.primary.border3}`,
        background: "#EDEDED",
        padding: "6px 10px",
        gap: "10px",
        alignItems: "center",

        "&>.MuiSvgIcon-root": {
          background: "transparent",
          color: "#727688",
        },
      },

      "&> .MuiChip-label": {
        padding: 0,
      },

      "& .MuiIconButton-root.MuiChip-deleteIcon": {
        margin: 0,
        padding: 0,
        "& > svg": {
          width: "0.75rem",
          height: "0.75rem",
        },
      },
    },
    date: {
      width: "100%",
    },
    category: {
      "& .select__menu": {
        position: "absolute",
        zIndex: 9999,
        overflow: "auto",
      },
      "& .select__control ": {
        minHeight: 50,
      },
      "& .select__multi-value__label": {
        fontSize: "14px",
        color: `${theme.palette.primary.tagText} !important`,
      },
      "& .select__multi-value__remove": {
        "&:hover": {
          background: theme.palette.primary.grey93,
          color: theme.palette.primary.tagText,
          cursor: "pointer",
        },
      },
      "& .select__multi-value": {
        borderRadius: "4px",
        border: `1px solid  ${theme.palette.primary.border3}`,
        background: theme.palette.primary.grey93,
        padding: "4px",
      },
    },
    thumbnail: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      border: `1px solid ${theme.palette.primary.border1}`,
      borderRadius: "4px",
      height: "50px",
      "&:focused": {
        borderColor: theme.palette.primary.blue500,
      },
    },
    errorFiles: {
      borderColor: theme.palette.primary.error,
    },
    errorText: {
      color: theme.palette.primary.error,
      fontSize: 12,
    },
    imgName: {
      width: "90%",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: `0 ${theme.spacing(2)}`,
    },
    text: {
      display: "block",
      color: theme.palette.primary.blue500,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",

      "& svg": {
        position: "absolute",
        right: 15,
        top: 10,
        cursor: "pointer",
      },
    },
    categoryError: {
      "& .select__control": {
        borderColor: theme.palette.primary.error,
      },
    },

    timePicker: {
      maxWidth: "max-content",
      boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.30)",
      borderRadius: "24px",
      padding: "15px 30px 30px 30px",

      "&>.MuiPickersLayout-contentWrapper": {
        marginBottom: "20px",
      },

      "& .MuiPickersArrowSwitcher-root": {
        display: "none",
      },

      "& .MuiClock-clock": {
        position: "relative",
        outline: `1px solid ${theme.palette.primary.extraText}`,
        outlineOffset: "8px",
        background: theme.palette.primary.timePickerClock,

        "& .MuiClockNumber-root": {
          color: theme.palette.primary.white,
          zIndex: 2,
        },

        "& .MuiClockPointer-root, & .MuiClockPointer-thumb, & .MuiClock-pin": {
          backgroundColor: theme.palette.primary.blue500,
          borderColor: theme.palette.primary.blue500,
          zIndex: 1,
        },

        "&::after": {
          content: '" "',
          position: "absolute",
          width: "123px",
          height: "123px",
          backgroundColor: theme.palette.primary.main,
          // zIndex: "-1",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "999999px",
        },

        "&~.MuiButtonBase-root": {
          backgroundColor: theme.palette.primary.extraText,
          width: "42px",
          height: "42px",

          "&>.MuiTypography-root": {
            fontWeight: "700",
            color: theme.palette.primary.white,
          },
        },
      },

      "&>.MuiDialogActions-root": {
        "&>.MuiButtonBase-root": {
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          background: "linear-gradient(270deg, #2F9EDD 0%, #427EEB 100%)",
          color: theme.palette.primary.white,
          fontSize: "1rem",
          fontWeight: "700",
        },
      },
    },

    timePickerToolbar: {
      "&>.MuiTypography-root": {
        display: "none",
      },
      "&>.MuiGrid-root": {
        justifyContent: "center",
      },
    },
    timePickerActivingAM: {
      "& .MuiPickersLayout-contentWrapper>.MuiTimeClock-root>.MuiClock-root": {
        "&>.MuiButtonBase-root": {
          "&:first-of-type": {
            backgroundColor: theme.palette.primary.blue500,
          },
        },
      },
    },
    timePickerActivingPM: {
      "& .MuiPickersLayout-contentWrapper>.MuiTimeClock-root>.MuiClock-root": {
        "&>.MuiButtonBase-root": {
          "&:last-of-type": {
            backgroundColor: theme.palette.primary.blue500,
          },
        },
      },
    },
    button: {
      "&.MuiButton-root": {
        fontWeight: 700,
        fontSize: "1rem",
      },
    },
    editButton: {
      display: "flex",
      justifyContent: "center",
      "& .MuiButtonBase-root": {
        maxWidth: 345,
      },
    },
    groupButton: {
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(3.75),
    },
    cancelButton: {
      "&.MuiButtonBase-root": {
        backgroundImage: "none",
        background: theme.palette.primary.cancel,
        color: theme.palette.primary.blue900,
        boxShadow: "none",
        "&:hover": {
          background: theme.palette.primary.cancel,
        },
      },
    },
    removeButton: {
      "&.MuiButtonBase-root": {
        backgroundImage: "none",
        background: theme.palette.primary.error,
        "&:hover": {
          background: theme.palette.primary.lightError,
        },
      },
    },

    linkCopy: {
      cursor: "pointer",
      color: theme.palette.primary.activeLink,
      textDecoration: "underline",
      fontWeight: 500,
    }
  }
});
