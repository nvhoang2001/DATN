import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    createLiveStream: {
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
    note: {
      color: theme.palette.primary.error,
      fontSize: "14px",
      marginRight: 5,
    },
    lable: {
      color: `${theme.palette.primary.labelText}`,
    },
    invalid: {
      "&.react-multi-email": {
        border: `1px solid ${theme.palette.primary.error} !important`,
      },
    },
    email: {
      height: "50px",
      marginBottom: "5px",
      "&.react-multi-email [data-tag]": {
        height: 34,
        color: theme.palette.primary.tagText,
        fontWeight: 400,
        fontSize: "14px",
        fontFamily: "Inter",
        fontStyle: "normal",
        background: theme.palette.primary.grey93,
        border: `1px solid ${theme.palette.primary.border3}`,
      },
      "&.react-multi-email [data-tag] [data-tag-item]": {
        overflow: "inherit",
      },

      "&.react-multi-email.focused": {
        borderColor: `${theme.palette.primary.info} !important`,
      },
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
    inputFile: {
      display: "none",
    },
    thumbnail: {
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
    text: {
      display: "block",
      padding: "10px 15px",
      color: theme.palette.primary.blue500,
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "90%",
      whiteSpace: "nowrap",

      "& svg": {
        position: "absolute",
        right: 15,
        top: 10,
        cursor: "pointer",
      },
    },
    cancel: {
      background: `${theme.palette.primary.cancel} !important`,
      color: `${theme.palette.primary.blue900} !important`,
    },
    categoryError: {
      "& .select__control": {
        borderColor: theme.palette.primary.error,
      },
    },
    emailTag: {
      "&.MuiChip-root": {
        height: "auto",
        borderRadius: "4px",
        border: `1px solid  ${theme.palette.primary.border3}`,
        background: theme.palette.primary.grey93,
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
  };
});
