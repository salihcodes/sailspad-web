import * as React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid } from "@material-ui/core";
import { Header } from "Components/Header";
import { maxContainerWidth } from "../../theme";
import { Footer } from "Components/Footer";

interface Prop {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layoutBody: {
      // maxHeight: "1000px",
      // paddingBottom: "100px"
    },
    wrapper: {
      maxWidth: maxContainerWidth,
      margin: "auto",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1)
      }
    },
    container: {
      margin: "auto",
      justifyContent: "center",
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1)
      }
    },
    centerGrid: {
      maxHeight: "90%",
      minHeight: "90%",
      width: "100%",
      marginBottom: theme.spacing(8)
    },
  })
);

const Layout = ({ children }: Prop) => {
  const classes = useStyles();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  // const isTab = useMediaQuery(theme.breakpoints.down("sm"));
  const isNotMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className={classes.layoutBody}>
      <Header />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Grid container justifyContent="center">
            <Grid className={classes.centerGrid} item xs={12}>
              {children}
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;