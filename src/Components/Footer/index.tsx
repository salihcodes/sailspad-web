import React from 'react'
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: "auto",
      // position: "fixed",
      width: "100%",
      // bottom: "0",
      textAlign: "center",
      // right: 0,
      // left: 0,
      // height: "150px",
      display: "flex",
      justifyContent: "center",
      background: theme.palette.gray[100],
    },
    contentGrid: {
      maxWidth: "660px",
      // position: "absolute",
      // bottom: 0,
      paddingBottom: "30px",
      [theme.breakpoints.down('sm')]: {
        maxWidth: "360px"
      }
    },
    companyName: {
      marginBottom: "15px",
      fontFamily: "Tajawal",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "22px",
      textAlign: "center",
      color: "#1E2D3D",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "10px",
        fontSize: "14px"
      }
    },
    companyDetail: {
      fontFamily: "Tajawal",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "12px",
      lineHeight: "14px",
      textAlign: "center",
      color: "#1E2D3D",
      [theme.breakpoints.down("xs")]: {
        textAlign: "justify",
        fontSize: "10px"
      }
    }
  })
);

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Grid container alignItems='center' justifyContent='center' className={classes.contentGrid}>
        <Typography className={classes.companyName}>
          Beyin Digital Technology Limited |  Abu Dhabi, Masdar City
        </Typography>
        {/* <br />
        <br /> */}
        <Typography className={classes.companyDetail}>
          © Beyin Digital Technology Limited - 2022. The trademarks, logos, designs, services and the content appearing herein, is exclusively owned by Beyin Digital Technology Limited, and/or its licensors, and are protected. Any unauthorized use or reproduction or distribution, shall attract suitable action under applicable law.
        </Typography>
      </Grid>
    </div>
  )
}
