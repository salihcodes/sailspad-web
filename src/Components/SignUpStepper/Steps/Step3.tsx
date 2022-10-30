import * as React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import Button from "Components/Button";
import { StepperContext } from "Context/StepperContext";
import { UserContext } from "Context/AuthContext";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { SubscribedCard } from "../Components/SubscribedCard";
import { API_URL, getAccessToken } from "Hooks/api";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 20),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2),
      },
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
      marginTop: theme.spacing(8),
    },
    actionButtons: {
      display: "flex",
      justifyContent: "end",
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
      minWidth: "200px",
      maxWidth: "220px",
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
  })
);

export const CreditCardPayment = () => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  const return_url = import.meta.env.VITE_RETURN_URL;

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  // states
  const [focused, setfocused] = React.useState<
    "name" | "number" | "expiry" | "cvc"
  >("name");
  const [showInputs, setShowInput] = React.useState<boolean>(true);
  // Context
  const {
    userDetails,
    creditCardDetail,
    setCreditCardDetail,
    signUpUsertoken,
    handleFinish,
    setUserDetails,
  } = React.useContext(StepperContext);
  const { token, setToken } = React.useContext(UserContext);

  // formik
  const formik = useFormik({
    initialValues: {
      number: creditCardDetail?.number,
      expiry: creditCardDetail?.expiry,
      cvc: creditCardDetail?.cvc,
      name: creditCardDetail?.name,
      country: creditCardDetail?.country,
    },

    // validationSchema: validationSchema,
    onSubmit: (values) => {
      setCreditCardDetail(values);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    let { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${return_url}`,
      },
    });
    setIsLoading(true);
    if (error) {
      // show error and collect new card details.
      setMessage(error?.message || "");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setToken(signUpUsertoken);
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <Typography className={classes.stepHeading}>Card information</Typography>
      <PaymentElement />
      {message && <div id="payment-message">{message}</div>}

      <br />
      <br />
      <Grid container alignItems="flex-start" justifyContent="space-between">
        <Grid item xs={9}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <Typography className={classes.totalText}>Total:</Typography>
              <Typography className={classes.totalPrice}>
                ${userDetails?.totalAmount}/M
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <SubscribedCard
                cardCount={userDetails?.cardAmount}
                subscription={userDetails?.subscriptionType}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.actionsContainer}>
        <div className={classes.actionButtons}>
          <Button
            // onClick={(e) => handleSubmit(e)}
            // loading={isLoading}
            submit="submit"
            type="stepper"
            text="Checkout"
          />
        </div>
      </div>
    </form>
  );
};
