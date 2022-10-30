import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Checkbox, Grid, Typography, useMediaQuery } from "@material-ui/core";
import Card from "react-credit-cards";
import Button from "Components/Button";
import MuiIcons from "Components/Icons";
import { StepperContext } from "Context/StepperContext";
import { UserContext } from "Context/AuthContext";
import MaskingInput from "Components/Form/MaskingInput";
import TextInput from "Components/Form/TextInput";
import S from "react-card-carousel";
const ReactCardCarousel = S.default ? S.default : S;

import { useHistory } from "react-router-dom";
import { SubscribedCard } from "Components/SignUpStepper/Components/SubscribedCard";
import Select, { DefaultValue } from "Components/Form/Select";
import { CountryData } from "Components/SignUpStepper/Data/Countries";
import { Footer } from "Components/SignUpStepper/Components/Footer";
import { TickIcon } from "Components/Icons/tickIcon";
import { CreditCardInputs } from "./Component/CreditCardInputs";

// CSS
import useStyles from "./Style";
import { creditCardImage, creditCardType } from "Components/Form/CCType";
import { API_URL, getAccessToken } from "Hooks/api";
import axios from "axios";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormatItalic } from "@material-ui/icons";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK as string;
const stripePromise = loadStripe(STRIPE_PK);

export const UpgradeSubscriptionPlan = () => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const BigScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const history = useHistory();

  // states
  const cardCarousalRef = React.useRef<any>();
  const [cardNumber, setCardNumber] =
    React.useState<string>("4242424242424242");
  const [inValidDateEnter, setInValidDateEnter] =
    React.useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = React.useState<boolean>(true);
  const [showInputs, setShowInput] = React.useState<boolean>(false);
  const [country, setCountry] = React.useState<DefaultValue>({
    label: "Country",
    value: "Not Available",
  });
  const [selectedCountry, setSelectedCountry] = React.useState<string>("");
  const [focused, setfocused] = React.useState<
    "name" | "number" | "expiry" | "cvc"
  >("name");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cardDetails, setCardDetails] = React.useState<any>({});
  // Context
  const { user, logout } = React.useContext(UserContext);
  const {
    userDetails,
    creditCardDetail,
    setCreditCardDetail,
    handleFinish,
    setUserDetails,
    clientSecret,
    setClientSecret,
    yearlySubcription,
    setYearlySubcription,
  } = React.useContext(StepperContext);

  // formik
  const formik = useFormik({
    initialValues: {
      number: creditCardDetail?.number,
      expiry: creditCardDetail?.expiry,
      cvc: creditCardDetail?.cvc,
      name: creditCardDetail?.name,
      country: creditCardDetail?.country,
      numberOfCards: user?.cardSlots,
      totalAmount: 2,
      subscriptionPricePerCard: 2,
    },

    // validationSchema: validationSchema,
    onSubmit: (values) => {
      setCreditCardDetail(values);
    },
  });

  const getCardDetails = async () => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    setIsLoading(true);
    const res = await axios.get(`${API_URL}/stripe/get-cards`, config);

    if (res.status === 200 || res.status === 201) {
      setCardDetails(res.data.data[0].card);
      setIsLoading(false);
    }
  };

  const subscriptionType = (value: number) => {
    if (value >= 1 && value <= 10) {
      return "Personal";
    } else if (value >= 11 && value <= 50) {
      return "Startup";
    } else if (value >= 51 && value <= 100) {
      return "SME";
    } else if (value >= 101 && value <= 200) {
      return "SME+";
    } else if (value > 200) {
      return "Agency";
    }
    return "";
  };
  const handleCardsChange = (e: any) => {
    formik.handleChange(e);
    const value = e.target.value;
    let totalCardsAmount;
    if (value >= 1 && value <= 10) {
      totalCardsAmount = 2;
      cardCarousalRef.current.goTo(0);
      formik.setFieldValue("subscriptionType", "Personal", true);
      formik.setFieldValue("subscriptionPricePerCard", 2);
    } else if (value >= 11 && value <= 50) {
      totalCardsAmount = 15;
      cardCarousalRef.current.goTo(1);
      formik.setFieldValue("subscriptionType", "Startup", true);
      formik.setFieldValue("subscriptionPricePerCard", 1.5);
    } else if (value >= 51 && value <= 100) {
      totalCardsAmount = 60;
      cardCarousalRef.current.goTo(2);
      formik.setFieldValue("subscriptionType", "SME", true);
      formik.setFieldValue("subscriptionPricePerCard", 1.2);
    } else if (value >= 101 && value <= 200) {
      totalCardsAmount = 120;
      cardCarousalRef.current.goTo(3);
      formik.setFieldValue("subscriptionType", "SME+", true);
      formik.setFieldValue("subscriptionPricePerCard", 1.2);
    } else if (value > 200) {
      let x = value * 1;
      // x.toFixed(15).replace(/0+$/, "")
      totalCardsAmount = x;
      cardCarousalRef.current.goTo(4);
      formik.setFieldValue("subscriptionType", "Agency", true);
      formik.setFieldValue("subscriptionPricePerCard", 1);
    }
    formik.setFieldValue("totalAmount", totalCardsAmount, true);
  };

  const handleSubmit = async (e: any) => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    e.preventDefault();
    setIsLoading(true);
    const upgrade = await axios.patch(
      `${API_URL}/stripe/upgrade-monthly-subscription`,
      {
        cardAmount: parseInt(formik.values.numberOfCards) as number,
        yearlySubscription: yearlySubcription,
      },
      config
    );

    if (upgrade.status === 200) {
      history.push("/");
      setIsLoading(false);
    }
  };

  const handleChangeBilling = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    const res = await axios.get(
      `${API_URL}/stripe/create-billing`,
      config
    );
    if (res.status === 200 || res.status === 201) {
      window.location.replace(res.data.url);
    }
  };

  const cardType = creditCardType(cardDetails?.brand);
  const cardImage = creditCardImage("4242424242424242", true);

  React.useEffect(() => {
    getCardDetails();
  }, []);

  return (
    <div className={classes.root}>
      <div
        style={{ display: "flex", alignItems: "center", margin: "20px 10px" }}
      >
        <MuiIcons
          icon="backArrow"
          className={classes.backIcon}
          onClick={() => history.push("/")}
        />
        &nbsp;&nbsp;&nbsp;
        <Typography className={classes.heading}>
          Upgrade Subscription
        </Typography>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className={classes.wrapper}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} lg={6}>
              <Typography className={classes.stepHeading}>
                Your Current Subscription:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.accountDetail}>
              {user && (
                <Typography className={classes.accountName}>
                  {user?.firstName} {user?.lastName}&nbsp;&nbsp;&nbsp;&nbsp;
                  {user?.availableCardSlots && (
                    <Typography className={classes.cardDetails}>
                      {user?.availableCardSlots}/{user?.cardSlots}
                    </Typography>
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent={!BigScreen ? "space-between" : "center"}
          >
            <Grid item xs={12} md={10} lg={10}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                justifyContent="center"
              >
                <Grid item xs={12} md={6} lg={6} xl={4}>
                  <SubscribedCard
                    cardCount={user?.availableCardSlots}
                    subscription={subscriptionType(
                      user?.availableCardSlots
                    ).toString()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={4}>
                  <Typography className={classes.subscriptionDetail}>
                    when upgrading your subscription by changing the number of
                    cards available for your account, your billing will update
                    to the new subscription rates
                  </Typography>

                  {/* <Typography
                    // style={{ color: "red", marginLeft: "auto" }}
                    onClick={handleCancelSubscription}
                    loading={isLoading}
                    // submit="submit"
                    type="stepper"
                    text="Cancel"
                    // endIcon={<MuiIcons className={classes.arrowIcons} icon="ArrowForwardIosIcon" fontSize="small" />}
                  ></Typography> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <br />

          <Typography className={classes.stepHeading}>
            Choose your subscription
          </Typography>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid
              item
              xs={12}
              md={9}
              lg={9}
              style={{ minHeight: "150px", position: "relative" }}
            >
              {/* <Carousel arrows={false} slides={slides} /> */}
              <div className={classes.carousalDiv}>
                <ReactCardCarousel
                  ref={cardCarousalRef}
                  initial_index={0}
                  autoplay={false}
                >
                  <div
                    className={classes.card}
                    onClick={() => {
                      formik.setFieldValue("numberOfCards", 10, true);
                      formik.setFieldValue("totalAmount", 2, true);
                      formik.setFieldValue(
                        "subscriptionType",
                        "Personal",
                        true
                      );
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={8}>
                        <Typography className={classes.cardHeading}>
                          Personal Subscription{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.cardCount}>
                          1-10
                        </Typography>
                        <Typography className={classes.cardText} align="right">
                          Cards
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={12}>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            $2 per user monthly
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Customizable card and logo
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className={classes.card}
                    onClick={() => {
                      formik.setFieldValue("numberOfCards", 50, true);
                      formik.setFieldValue("totalAmount", 15, true);
                      formik.setFieldValue("subscriptionType", "Startup", true);
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={8}>
                        <Typography className={classes.cardHeading}>
                          Startup Subscription{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.cardCount}>
                          10-50
                        </Typography>
                        <Typography className={classes.cardText} align="right">
                          Cards
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={12}>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            $1.5 per user monthly
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Customizable card and logo
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className={classes.card}
                    onClick={() => {
                      formik.setFieldValue("numberOfCards", 100, true);
                      formik.setFieldValue("totalAmount", 60, true);
                      formik.setFieldValue("subscriptionType", "SME", true);
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={8}>
                        <Typography className={classes.cardHeading}>
                          SME Subscription{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.cardCount}>
                          50-100
                        </Typography>
                        <Typography className={classes.cardText} align="right">
                          Cards
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={12}>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            $1.2 per user monthly
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Customizable card and logo
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className={classes.card}
                    onClick={() => {
                      formik.setFieldValue("numberOfCards", 200, true);
                      formik.setFieldValue("totalAmount", 120, true);
                      formik.setFieldValue("subscriptionType", "SME+", true);
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={8}>
                        <Typography className={classes.cardHeading}>
                          SME+ Subscription{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.cardCount}>
                          100-200
                        </Typography>
                        <Typography className={classes.cardText} align="right">
                          Cards
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={12}>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            $1.2 per user monthly
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Customizable card and logo
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Fully customizable loading page
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className={classes.card}
                    onClick={() => {
                      formik.setFieldValue("numberOfCards", 200, true);
                      formik.setFieldValue("totalAmount", 200, true);
                      formik.setFieldValue("subscriptionType", "Agency", true);
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={8}>
                        <Typography className={classes.cardHeading}>
                          Agency Subscription{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.cardCount}>
                          200+
                        </Typography>
                        <Typography className={classes.cardText} align="right">
                          Cards
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={12}>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            $1 per user monthly
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Customizable card and logo
                          </Typography>
                        </div>
                        <div className={classes.cardDetail}>
                          <TickIcon />
                          &nbsp; &nbsp;
                          <Typography className={classes.cardText}>
                            Fully customizable loading page
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </ReactCardCarousel>
              </div>
            </Grid>
            <br />
          </Grid>

          <br />

          <Typography className={classes.stepHeading}>
            Card information
          </Typography>
          <Grid
            className={classes.mainContent}
            container
            justifyContent="flex-start"
          >
            <Grid item xs={12} md={9} lg={9} xl={9}>
              <Grid item xs={12} md={9} justifyContent="space-between">
                <Grid container alignItems="center">
                  {cardImage}
                  &nbsp;
                  <Typography className={classes.cardNumber}>
                    {cardType} card ending With {cardDetails?.last4}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    onClick={handleChangeBilling}
                    className={classes.changeButton}
                  >
                    Edit Subscription
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
          </Grid>

          <div>
            <Footer />
          </div>
        </div>
      </form>
    </div>
  );
};
