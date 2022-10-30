import * as React from "react";
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import SignUpBanner from "Assets/signUp.png";
import SignUpStepper from "Components/SignUpStepper";
import { useHistory } from "react-router-dom";
import Logo from "Components/Logo";
import { UserContext } from "Context/AuthContext";
import { UpgradeSubscriptionPlan } from "Components/Subscription";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      height: "100vh",
    },
    imageContainer: {
      background: `url(${SignUpBanner})`,
      // maxHeight: "100%",
      minHeight: "100vh",
      width: "100%",
      // padding: theme.spacing(3),
      overflowX: "hidden",
      overflowY: "auto",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
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
      width: "75%",
      fontFamily: "Tajawal",
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
    logoDiv: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
      width: "50%",
      position: "absolute",
      //   marginTop: theme.spacing(0),
      [theme.breakpoints.down("sm")]: {
        marginTop: 0,
        marginLeft: theme.spacing(7),
        width: "20%",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: 0,
        marginLeft: theme.spacing(8),
        width: "30%",
      },
    },
  })
);

export const SubscriptionDetailPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  return (
    <Grid
      className={classes.wrapper}
      container
      alignItems="flex-start"
      justifyContent="space-between"
    >
      {!smallScreen && (
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.logoDiv} onClick={() => history.push("/")}>
            <img
              src="https://res.cloudinary.com/salihudev/image/upload/v1655059739/Sailspad_1_lfgfw6.png"
              style={{ width: "40%" }}
            />
          </div>
          <div className={classes.imageContainer}></div>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={6}>
        <UpgradeSubscriptionPlan />
      </Grid>
    </Grid>
  );
};
