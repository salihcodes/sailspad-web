import * as React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormik } from "formik";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Layout from "Components/Layout";
import Button from "Components/Button";
import FormInput from "Components/Form/FormInput";
import { UserContext } from "Context/AuthContext";
import { useHistory } from "react-router-dom";
import Logo from "Components/Logo";
import { useLoginUser } from "Hooks/useLogin";
import { toast } from "react-toastify";
import { LoginCredentials } from "Interfaces/Login";
import { StepperContext } from "Context/StepperContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      margin: "5rem 0 5rem 0",
    },
    inputFeildContainer: {
      // width: "100%",
      maxWidth: "600px",
      padding: theme.spacing(3, 6),
      background: theme.palette.gray[100],
      borderRadius: "20px",
      boxShadow: "0px 138px 189px -76px rgba(0, 0, 0, 0.06)",
      border: `2px solid rgba(227, 227, 227, 0.8)`,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 6),
      },
    },
    buttonDiv: {
      marginTop: "16px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    helperText: {
      width: "100%",
      fontFamily: "Tajawal",
      textAlign: "center",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "22px",
      color: "#1E2D3D",
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    logoText: {
      fontFamily: "Tajawal",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "22px",
      color: "#1E2D3D",
      padding: theme.spacing(1),
    },
    contactUs: {
      fontFamily: "Tajawal",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "18px",
      color: "#1E2D3D",
    },
    logoContainer: {
      display: "flex",
      width: "100%",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "10px",
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
  })
);

const validationSchema = yup.object({
  email: yup.string().required("Email or username is required"),
  password: yup.string().required("Password is required"),
});

export const LoginPage = () => {
  const history = useHistory();
  const classes = useStyles();
  // Contexts
  const { token, setToken, user } = React.useContext(UserContext);
  const { setActiveStep } = React.useContext(StepperContext);
  // Mutatations
  const { data, mutate, isLoading, isError, error } = useLoginUser();

  React.useEffect(() => {
    if (token !== "") history.push("/");
  }, [token]);

  React.useEffect(() => {
    if (data?.accessToken) {
      setToken(data?.accessToken);
      if (data?.signupStep === 1) {
        history.push("/signup");
        setActiveStep(1);
      } else {
        history.push("/");
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (isError) toast.error("Invalid Credentials!");
  }, [isError, data]);

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
  } = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onContinue: SubmitHandler<LoginCredentials> = async (data) => {
    await mutate(data);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     identifier: "",
  //     password: ""
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: values => {
  //     mutate(values)
  //   }
  // });

  return (
    <Layout>
      <form onSubmit={handleSubmit(onContinue)}>
        <Grid
          className={classes.wrapper}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
            <div className={classes.inputFeildContainer}>
              <div className={classes.logoContainer}>
                <img
                  src="https://res.cloudinary.com/salihudev/image/upload/v1655059739/Sailspad_1_lfgfw6.png"
                  style={{ width: "40%" }}
                />
              </div>
              <Typography className={classes.logoText} align="center">
                Welcome to the Sailspad <br />
                Please enter your username and password{" "}
              </Typography>

              <br />
              <FormInput
                name="email"
                type="text"
                register={register}
                placeholder="Email or username"
                // error={
                //   touchedFields.identifier &&
                //   Boolean(errors.identifier?.message)
                // }
                // helperText={errors.identifier?.message}
              />
              <br />
              <FormInput
                name="password"
                type="password"
                register={register}
                placeholder="Password"
                error={
                  touchedFields.password && Boolean(errors.password?.message)
                }
                helperText={errors.password?.message}
              />
              <div className={classes.buttonDiv}>
                <Button
                  text="Login"
                  type="grey"
                  submit="submit"
                  loading={isLoading}
                />
              </div>
            </div>
            <br />
            <Typography className={classes.helperText}>
              Forgot password?{" "}
              <a
                style={{ color: "black", textDecoration: "none" }}
                href="https://api.sailspad.com/api/v1/auth/forgot-password-page"
              >
                Click here
              </a>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default LoginPage;
