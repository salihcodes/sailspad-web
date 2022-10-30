import * as React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Checkbox, Grid, Typography, useMediaQuery } from "@material-ui/core";
import Button from "Components/Button";
// import PhoneInput, {
//   isPossiblePhoneNumber,
//   isValidPhoneNumber,
//   Value as phoneInputType,
// } from "react-phone-number-input";
import DatePicker from "Components/Form/DatePicker";
import { StepperContext } from "Context/StepperContext";
import Calculate_age from "../DateCalculate";
import { TickIcon } from "Components/Icons/tickIcon";
import S from "react-card-carousel";
const ReactCardCarousel = S.default ? S.default : S;
import { useHistory } from "react-router-dom";
import { useSignUp } from "Hooks/useSignUp";
import { toast } from "react-toastify";
import FormInput from "Components/Form/FormInput";
import { UserDetails } from "Interfaces/SignUp";
import { UserContext } from "Context/AuthContext";

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
      margin: "0px",
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
      minWidth: "240px",
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

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(4, "Minimum 4 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(4, "Minimum 4 characters")
    .required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    })
    .required("Confirm Password"),
  //   phoneNumber: yup
  //     .string()
  //     .min(8, "Minimum 7 digits required")
  //     .required("Phone Number is Required"),
  cardAmount: yup
    .number()
    .min(1, "Minimum 1 Card required")
    .max(500, "Limit Exceeds")
    .required("No. of Cards Required"),
});

export const AccountDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  //   const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  // states
  const cardCarousalRef = React.useRef<any>();
  //   const [invalidPhoneNumber, setInvalidPhoneNumber] =
  //     React.useState<string>("");
  const [invalidDate, setInvalidDate] = React.useState<string>("");
  const [inValidDateEnter, setInValidDateEnter] =
    React.useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = React.useState<boolean>(false);
  //   const [emailToCheck, setEmailToCheck] = React.useState<string>("");
  //   const [emailValid, setEmailValid] = React.useState<boolean>();

  // Context
  const {
    activeStep,
    setActiveStep,
    // handleNext,
    userDetails,
    setUserDetails,
    setSignUpUserToken,
    yearlySubcription,
    setYearlySubcription,
  } = React.useContext(StepperContext);
  //   const { token, setToken } = React.useContext(UserContext);

  // Mutation
  const { mutate, isError, data, isLoading, isSuccess } = useSignUp();

  // React Hook Form
  const {
    register,
    trigger,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setFocus,
    setValue,
    getValues,
    formState: { errors, isValid, touchedFields, isSubmitting },
  } = useForm<UserDetails>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      password: userDetails?.password,
      confirmPassword: userDetails?.confirmPassword,
      cardAmount: userDetails?.cardAmount,
      subscriptionType: userDetails?.subscriptionType,
      subscriptionPricePerCard: userDetails?.subscriptionPricePerCard,
      totalAmount: userDetails?.totalAmount,
    },
  });

  React.useEffect(() => {
    const formValues = getValues();
    if (
      isSuccess &&
      isValid &&
      data &&
      data.statusCode !== 409 &&
      data.statusCode !== 400
    ) {
      setUserDetails(formValues);
      setActiveStep(1);
    }
  }, [data]);

  // checking if user already exists
  React.useEffect(() => {
    if (data && data.statusCode === 409 && data.error?.includes("email")) {
      setError("email", { type: "manual", message: data.error.toUpperCase() });
      setFocus("email", { shouldSelect: true });
    }
  }, [data]);

  React.useEffect(() => {
    if (data && data.statusCode === 409) toast.error("Something went wrong");
  }, [data]);

  // set the userAuth Toke on signup
  React.useEffect(() => {
    if (data?.accessToken) {
      setSignUpUserToken(data?.accessToken);
    }
  }, [data]);

  const handleDateChange = async (date: any) => {
    const formattedDate = new Date(date).toLocaleDateString();
    setValue("dateOfBirth", formattedDate, {
      shouldTouch: true,
      shouldValidate: true,
    });
    const checkAge = (await Calculate_age(formattedDate)) >= 16;
    const values = await getValues();
    setUserDetails(values);
    if (!checkAge) {
      setInValidDateEnter(false);
    }
    if (checkAge) {
    }
  };

  const handleCardsChange = (e: any) => {
    const value = e.target.value;
    let totalCardsAmount: number = 0;
    if (value >= 1 && value < 10) {
      totalCardsAmount = 2;
      cardCarousalRef.current.goTo(0);
      setValue("subscriptionType", "Personal", { shouldValidate: true });
      setValue("subscriptionPricePerCard", 2, { shouldValidate: true });
    } else if (value >= 10 && value < 50) {
      totalCardsAmount = 15;
      cardCarousalRef.current.goTo(1);
      setValue("subscriptionType", "Startup", { shouldValidate: true });
      setValue("subscriptionPricePerCard", 1.5, { shouldValidate: true });
    } else if (value >= 50 && value < 100) {
      totalCardsAmount = 60;
      cardCarousalRef.current.goTo(2);
      setValue("subscriptionType", "SME", { shouldValidate: true });
      setValue("subscriptionPricePerCard", 1.2, { shouldValidate: true });
    } else if (value >= 100 && value <= 199) {
      totalCardsAmount = 120;
      cardCarousalRef.current.goTo(3);
      setValue("subscriptionType", "SME+", { shouldValidate: true });
      setValue("subscriptionPricePerCard", 1.2, { shouldValidate: true });
    } else if (value >= 200) {
      let x = value * 1;
      // x.toFixed(15).replace(/0+$/, "")
      totalCardsAmount = x;
      cardCarousalRef.current.goTo(4);
      setValue("subscriptionType", "Agency", { shouldValidate: true });
      setValue("subscriptionPricePerCard", 1, { shouldValidate: true });
    }
    setValue("totalAmount", totalCardsAmount, { shouldValidate: true });
  };

  // Submit Function
  const onContinue: SubmitHandler<UserDetails> = async (data) => {
    if (agreeTerms == false) {
      toast.error("Please Agree to terms before moving forward");
      return;
    }
    await setUserDetails(data);
    await mutate(data);
  };
  console.log(agreeTerms);
  // Checking Error Before Submit
  const checkBeforeSubmit = (e: any) => {
    e.preventDefault();

    trigger();
  };

  const dateValue = getValues("dateOfBirth");

  return (
    <form onSubmit={isValid ? handleSubmit(onContinue) : checkBeforeSubmit}>
      <div className={classes.signInTextWrapper}>
        <Button
          text="Sign in"
          type="grey"
          // className={classes.signInText}
          onClick={() => history.push("/login")}
        />
      </div>

      <Typography className={classes.stepHeading}>Sign up info</Typography>

      <Grid
        className={classes.mainContent}
        container
        justifyContent="flex-start"
      >
        <Grid item xs={12}>
          <Grid
            className={classes.inputFeild}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={9}>
              <FormInput
                name="firstName"
                type="text"
                placeholder="First name"
                error={Boolean(errors.firstName?.message)}
                // helperText={errors.firstName?.message}
                register={register}
              />
            </Grid>
            <Grid item xs={3}>
              {Boolean(errors.firstName?.message) && (
                <Typography className={classes.error}>
                  {errors.firstName?.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid
            className={classes.inputFeild}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={9}>
              <FormInput
                register={register}
                name="lastName"
                type="text"
                placeholder="Last Name"
                error={Boolean(errors.lastName?.message)}
                // helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={3}>
              {Boolean(errors.lastName?.message) && (
                <Typography className={classes.error}>
                  {errors.lastName?.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid
            className={classes.inputFeild}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={9}>
              <FormInput
                name="email"
                type="email"
                register={register}
                placeholder="Enter your email address"
                error={touchedFields.email && Boolean(errors.email?.message)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={3}>
              {Boolean(errors.email?.message) && (
                <Typography className={classes.error}>
                  {errors.email?.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid
            className={classes.inputFeild}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={9}>
              <FormInput
                name="password"
                type="password"
                register={register}
                placeholder="Enter your password"
                error={
                  touchedFields.password && Boolean(errors.password?.message)
                }
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={3}>
              {Boolean(errors.password?.message) && (
                <Typography className={classes.error}>
                  {errors.password?.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid
            className={classes.inputFeild}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={9}>
              <FormInput
                name="confirmPassword"
                type="password"
                register={register}
                placeholder="Confirm your password"
                error={Boolean(errors.confirmPassword?.message)}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={3}>
              {Boolean(errors.confirmPassword?.message) && (
                <Typography className={classes.error}>
                  {errors.confirmPassword?.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <br />

          {/* <Grid
            className={classes.inputFeild}
            container
            justifyContent="flex-start"
          >
            <Grid item xs={9} md={5}>
              <Typography className={classes.stepHeading}>
                {" "}
                Mobile Number
              </Typography>

              <PhoneInput
                id="phone_number"
                name="phone_number"
                className={classes.phoneInput}
                placeholder="+01234567"
                value={getValues("phoneNumber")}
                limitMaxLength={true}
                onChange={(value: phoneInputType) => {
                  setValue("phoneNumber", value, {
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
              />
              {errors && errors.phoneNumber?.message && (
                <Grid item lg={12}>
                  <Typography variant="body2" className={classes.error}>
                    &nbsp;&nbsp;
                    {errors.phoneNumber?.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.stepHeading}>
                Date of Birth
              </Typography>
              <DatePicker
                value={dateValue}
                onChange={handleDateChange}
                name="dateOfBirth"
                error={inValidDateEnter}
                helperText={invalidDate}
              />
            </Grid>
          </Grid> */}

          <br />

          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography className={classes.stepHeading}>
              Choose your subscription
            </Typography>

            <Grid item xs={12} style={{ minHeight: "150px" }}>
              <div className={classes.carousalDiv}>
                <ReactCardCarousel
                  ref={cardCarousalRef}
                  initial_index={0}
                  autoplay={false}
                >
                  <div
                    className={classes.card}
                    onClick={() => {
                      setValue("cardAmount", 9, { shouldValidate: true });
                      setValue("totalAmount", 20, { shouldValidate: true });
                      setValue("subscriptionType", "Personal", {
                        shouldValidate: true,
                      });
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
                          1-9
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
                      setValue("cardAmount", 49, { shouldValidate: true });
                      setValue("totalAmount", 75, { shouldValidate: true });
                      setValue("subscriptionType", "Startup", {
                        shouldValidate: true,
                      });
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
                          10-49
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
                      setValue("cardAmount", 99, { shouldValidate: true });
                      setValue("totalAmount", 118.8, { shouldValidate: true });
                      setValue("subscriptionType", "SME", {
                        shouldValidate: true,
                      });
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
                          50-99
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
                      setValue("cardAmount", 199, { shouldValidate: true });
                      setValue("totalAmount", 238.8, { shouldValidate: true });
                      setValue("subscriptionType", "SME+", {
                        shouldValidate: true,
                      });
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
                          100-199
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
                      setValue("cardAmount", 200, { shouldValidate: true });
                      setValue("totalAmount", 200, { shouldValidate: true });
                      setValue("subscriptionType", "Agency", {
                        shouldValidate: true,
                      });
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

            <Grid item xs={9}>
              <Grid container justifyContent="space-between">
                <Grid item xs={8}>
                  <div style={{ width: "65%" }}>
                    <Typography variant="body2">No. of cards</Typography>

                    <FormInput
                      register={register}
                      name="cardAmount"
                      onChangeFunction={(e) => handleCardsChange(e)}
                      type="text"
                      placeholder="No. of Cards"
                      error={Boolean(errors.cardAmount?.message)}
                      helperText={errors.cardAmount?.message}
                    />
                  </div>

                  <br />

                  <Grid item xs={12}>
                    <div className={classes.flex}>
                      <span>
                        {" "}
                        <Checkbox
                          className={classes.checkBox}
                          checked={yearlySubcription}
                          onChange={() =>
                            setYearlySubcription(!yearlySubcription)
                          }
                          name="yearlySubcription"
                        />
                      </span>
                      <span>
                        <Typography className={classes.checkBoxText}>
                          Pay yearly for a 5% discount
                        </Typography>
                      </span>
                    </div>
                    <div className={classes.flex}>
                      <span>
                        <Checkbox
                          className={classes.checkBox}
                          checked={agreeTerms}
                          onChange={() => setAgreeTerms(!agreeTerms)}
                          name="agreeTerms"
                        />
                      </span>
                      <span>
                        <Typography className={classes.checkBoxText}>
                          I agree to the Terms and Conditions
                        </Typography>
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.totalText}>Total:</Typography>
                  <Typography className={classes.totalPrice}>
                    $
                    {yearlySubcription
                      ? (
                          getValues("cardAmount") *
                            getValues("subscriptionPricePerCard") *
                            12 -
                          0.05 *
                            getValues("cardAmount") *
                            getValues("subscriptionPricePerCard") *
                            12
                        ).toFixed(2)
                      : (
                          getValues("cardAmount") *
                          getValues("subscriptionPricePerCard")
                        ).toFixed(2)}
                    {yearlySubcription ? "/Y" : "/M"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.actionsContainer}>
        <div className={classes.actionButtons}>
          <Button
            // onClick={(e) => handleSubmit(e)}
            loading={isLoading}
            submit="submit"
            type="stepper"
            text={activeStep === 2 ? "Finish" : "Next"}
          />
        </div>
      </div>
    </form>
  );
};
