import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AccountDetails } from "./Steps/Step1";
import Verify from "./Steps/Step2";
import { CreditCardPayment } from "./Steps/Step3";
import { StepperContext } from "Context/StepperContext";
import LogoSmall from "Components/Logo/LogoSmall";
import { Footer } from "./Components/Footer";
import { API_URL } from "Hooks/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK as string;
const stripePromise = loadStripe(STRIPE_PK);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // overflow:"hidden",
      width: "100%",
      maxHeight: "100vh",
      minHeight: "100%",
      "&>.MuiStepper-root": {
        padding: "0px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "100%",
      },
    },
    mainGridContainer: {
      height: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    actionButtons: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1.5rem",
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    sailspadText: {
      color: theme.palette.gray[100],
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "64px",
      lineHeight: "111%",
      textAlign: "center",
      margin: theme.spacing(2, 0, 8, 0),
      [theme.breakpoints.down("md")]: {
        fontSize: "45px",
      },
    },
    box1: {
      padding: theme.spacing(2, 0, 0, 3),
      backgroundColor: "#B3BEC059",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "0px",
      },
      // overflowY: "hidden",
    },
    box1Small: {
      padding: theme.spacing(2, 0, 0, 3),
      background: "#B3BEC059",
      // height: "90vh",
      // overflowY: "hidden",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "30px",
        height: "100%",
      },
    },
    box2: {
      // border: "1px solid red",
      backgroundColor: theme.palette.gray[100],
      // overflowY: "hidden",
      "&::-webkit-scrollbar": {
        display: "none !important",
      },
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "#E3E3E3",
        maxHeight: "100%",
      },
    },
    box2Small: {
      backgroundColor: theme.palette.gray[100],
      // height: "90vh",
      // overflowY: "hidden",
      "&::-webkit-scrollbar": {
        display: "none !important",
      },
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "#E3E3E3",
        maxHeight: "100%",
      },
    },
    stepperBox1: {
      // border: "1px solid red",
      backgroundColor: "transparent",
      // padding: "2rem 8rem",
      [theme.breakpoints.down("sm")]: {
        padding: "2rem 0px",
      },
    },
    stepperBox2: {
      backgroundColor: "#FBFBFB",
      paddingTop: "10px",
      height: "100vh",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: {
        padding: "20px",
        borderRadius: "0px",
      },
    },
    stepContent: {
      // border: "1px solid pruple",
      borderLeft: "none",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    subHeading: {
      padding: "0px",
      margin: "0px",
      fontSize: "13px",
      color: "#b5b5c3",
    },
    illustration: {
      textAlign: "center",
      padding: "10px",
    },
    label: {
      fontsize: "120px !important",
    },
  })
);

const getSteps = () => {
  return [
    { heading: "Account Type" },
    { heading: "Verify" },
    { heading: "Subscribe" },
  ];
};

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <AccountDetails />;
    case 1:
      return <Verify />;
    case 2:
      return <CreditCardPayment />;
    default:
      return;
  }
};

export default function SignUpStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const steps = getSteps();
  const { activeStep } = React.useContext(StepperContext);
  const smallHeightDevice = useMediaQuery("(max-height:768px)");
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { clientSecret } = React.useContext(StepperContext);

  const options = {
    clientSecret,
  };

  return (
    <div className={classes.root}>
      <Grid direction="row" container className={classes.mainGridContainer}>
        <Grid
          className={smallHeightDevice ? classes.box2Small : classes.box2}
          item
          xs={12}
        >
          <Stepper
            className={classes.stepperBox2}
            activeStep={activeStep}
            orientation="vertical"
          >
            {steps.map((label, index) =>
              index === 2 ? (
                <StepContent className={classes.stepContent} key={index}>
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <div>{getStepContent(index)}</div>
                    </Elements>
                  )}
                </StepContent>
              ) : (
                <StepContent className={classes.stepContent} key={index}>
                  <div>{getStepContent(index)}</div>
                </StepContent>
              )
            )}
            <br />
            <br />
            <br />
            <Footer />
          </Stepper>
        </Grid>
      </Grid>
    </div>
  );
}
