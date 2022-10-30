import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      overflowY: "auto",
    },
    mainContent: {
      // maxHeight: "700px",
      // overflowY: "auto",
      paddingBottom: theme.spacing(3),
    },
    inputFeild: {
      paddingBottom: theme.spacing(1),
    },
    flex: {
      display: "flex",
      alignItems: "center",
      height: "25px",
    },
    checkBoxWrapper: {
      marginTop: theme.spacing(4),
    },
    checkBox: {
      "&.MuiIconButton-root ": {
        padding: "none",
        paddingRight: "8px",
      },
      "&.MuiCheckbox-colorSecondary.Mui-checked": {
        color: theme.palette.gray[900],
      },
    },
    checkBoxText: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      color: theme.palette.gray[900],
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "8px",
      },
    },
    wrapper: {
      padding: theme.spacing(0, 7),
      maxHeight: "520px",
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(1, 3),
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3),
        maxHeight: "100%",
      },
    },
    inputLabel: {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "27px",
      color: "#58696D",
    },
    signInTextWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "10px",
    },
    signInText: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "24px",
      color: "#455154",
      userSelect: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
    inputFeildContainer: {
      margin: theme.spacing(6.5, 10, 1, 1),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(6.5, 4, 4, 4),
      },
    },
    stepHeading: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "45px",
      color: "#58696D",
      marginBottom: "10px",
      // [theme.breakpoints.down("sm")]: {
      //   fontSize: "18px"
      // }
    },
    actionsContainer: {
      // marginTop: theme.spacing(20),
    },
    actionButtons: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1, 1, 0, 1),
    },
    arrowIcons: {
      fontSize: "15px",
      margin: "0px 3px",
    },
    error: {
      padding: theme.spacing(0.25),
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#DE3737",
      marginLeft: "10px",
    },
    phoneInput: {
      background: "#FFFFFF",
      border: "1px solid #E3E3E3",
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      width: "98%",
      padding: theme.spacing(0, 1),
      "& input": {
        background: "#FFFFFF",
        border: "#f5f8fa",
        width: "100%",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "22px",
        display: "flex",
        alignItems: "center",
        color: "#58696D",
        outline: "none",
        height: "48px",
        padding: theme.spacing(0.75),
        "&:focus": {
          color: "#A0A9AB",
        },
      },
      "&.PhoneInputCountrySelectArrow": {
        fontSize: "18px",
      },
    },
    card: {
      padding: "16px",
      minWidth: "240px",
      minHeight: "150px",
      background: "#FFFFFF",
      border: "1px solid #E3E3E3",
      borderRadius: "8px",
      cursor: "pointer",
    },
    cardHeading: {
      fontStyle: "normal",
      fontWeight: 300,
      width: "30px",
      fontSize: "16.1133px",
      lineHeight: "16px",
    },
    cardCount: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "17px",
      lineHeight: "13px",
      textAlign: "right",
      marginTop: "10px",
      color: "#455154",
    },
    cardText: {
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "8px",
      textAlign: "right",
      marginTop: "2px",
      color: "#455154",
    },
    cardDetail: {
      display: "flex",
      alignItems: "center",
    },
    totalText: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "30px",
      color: "#58696D",
    },
    totalPrice: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "40px",
      lineHeight: "60px",
      color: "#58696D",
    },
    carousalDiv: {
      position: "relative",
      marginBottom: "10px",
      height: "190px",
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "middle !important",
      cursor: "pointer",
    },
    accountDetail: {
      minHeight: "45px",
      marginBottom: "10px",
      justifyContent: "flex-end",
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px !important",
        justifyContent: "space-evenly",
      },
    },
    accountName: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Poppins",
      color: theme.palette.secondary.light,
      display: "flex",
      alignItems: "center",
    },
    cardDetails: {
      fontSize: "18px",
      fontWeight: 250,
      fontFamily: "Poppins",
      color: theme.palette.secondary.light,
    },
    subscriptionDetail: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
      color: "#58696D",
      textTransform: "capitalize",
      textAlign: "start",
    },
    changeButton: {
      background: "#FBFBFB",
      border: "1px solid #E3E3E3",
      boxSizing: "border-box",
      boxShadow: "0px 19.9329px 32.7929px rgba(0, 0, 0, 0.03)",
      borderRadius: "64.2998px",
      width: "max-content",
      padding: theme.spacing(1, 3),
      // marginTop: theme.spacing(2),
      cursor: "pointer",
      // margin: "10px auto auto auto"
    },
    backIcon: {
      display: "flex",
      alignItems: "center",
      margin: "auto 0px",
      cursor: "pointer",
    },
    heading: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "27px",
      color: "#252D38",
    },
    cardNumber: {
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "22px",
      display: "flex",
      alignItems: "center",
      color: "#A0A9AB",
      marginTop: "4px",
    },
  })
);

export default useStyles;
