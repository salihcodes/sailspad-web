import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

interface props {
  readonly icon?: React.ReactElement;
  readonly heading: string | React.ReactElement;
  readonly details?: string;
  readonly type: string;
  readonly companySize?: boolean;
  readonly selectedType: string;
  readonly setSelectedType: (value: string) => void;
  readonly setValue?: React.Dispatch<React.SetStateAction<string>>;
  readonly error?: boolean;
  readonly helperText?: string | false | undefined | unknown;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: props) => ({
      // paddingTop: props.companySize ? theme.spacing(0) : theme.spacing(4)
    }),
    tabClicked: (props: props) => ({
      minWidth: "80px",
      height: "50px",
      background: theme.palette.gray[100],
      border: `0.642998px solid ${theme.palette.gray[600]}`,
      boxShadow: '0px 14px 25px 0px #0000000D',
      boxSizing: "border-box",
      borderRadius: "64.2998px",
      cursor: "pointer",
      margin: theme.spacing(0, 0.75),
      [theme.breakpoints.down("md")]: {
        minWidth: "40px"
      },
      [theme.breakpoints.down("sm")]: {
        height: "50px"
      }
    }),
    tab: (props: props) => ({
      minWidth: "80px",
      height: "50px",
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.gray[600]}`,
      boxSizing: "border-box",
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "33px",
      cursor: "pointer",
      margin: theme.spacing(0, 0.75),
      [theme.breakpoints.down("md")]: {
        minWidth: "40px"
      },
      [theme.breakpoints.down("sm")]: {
        height: "50px",
        margin: theme.spacing(0, 0.5)
      }
    }),
    icon: {
      color: theme.palette.secondary.dark
    },
    heading: (props: props) => ({
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      display: "block",
      alignItems: "center",
      textAlign: "center",
      color: theme.palette.gray[400],
      marginTop: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "14.8px",
        width: "70px"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12.8px",
        width: "60px"
      }
    }),
    headingClicked: (props: props) => ({
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      display: "block",
      alignItems: "center",
      textAlign: "center",
      color: theme.palette.secondary.dark,
      marginTop: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "14.8px",
        width: "70px"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12.8px",
        width: "60px"
      }
    }),
    label: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1.25, 1.5, 0, 1.5),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.25, 1, 0, 1)
      }
    },
    details: {
      padding: theme.spacing(1, 2),
      paddingTop: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "7.4px",
        margin: theme.spacing(0, 0, 3, 0)
      }
    },
    labelButton: (props: props) => ({
      border: "none",
      boxShadow: "none",
      background: "none",
      width: props.companySize ? "-webkit-fill-available" : "auto"
    }),
    redText: {
      color: "red",
      marginTop: "5px"
    },
    check: {
      padding: theme.spacing(0, 2),
      display: "flex",
      justifyContent: "end",
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        right: "-10px",
        bottom: "-15px"
      }
    },
    bottom: {
      position: "relative"
    }
  })
);

export default function NumberOfEmployees({
  icon,
  heading,
  details,
  type,
  setSelectedType,
  selectedType,
  companySize,
  error,
  helperText,
  setValue
}: props) {
  const classes = useStyles({
    icon,
    heading,
    details,
    type,
    setSelectedType,
    selectedType,
    companySize
  });

  return (
    <div className={classes.root}>
      <Paper
        className={selectedType !== type ? classes.tab : classes.tabClicked}
        // elevation={selectedType !== type ? 0 : 2}
        onClick={() => setSelectedType(type)}
      >
        <section className={classes.label}>
          <h2 className={selectedType !== type ? classes.heading : classes.headingClicked}>
            {heading}
          </h2>
          {icon && <span className={classes.icon}>{icon}</span>}
        </section>
        <div className={classes.bottom}>
          <div>{details && <div className={classes.details}>{details}</div>}</div>
        </div>
      </Paper>
      {error &&
        <Typography variant="body2" className={classes.redText}>
          &nbsp;&nbsp;{helperText}
        </Typography>
      }
    </div>
  );
}
