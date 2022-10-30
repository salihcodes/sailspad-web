import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import MuiIcon from "Components/Icons";

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
      paddingTop: props.companySize ? theme.spacing(0) : theme.spacing(4)
    }),
    tabClicked: (props: props) => ({
      maxWidth: "300px",
      minWidth: "215px",
      height: "205px",
      background: "#EFF2F3",
      border: "1px solid #A0A9AB",
      boxSizing: "border-box",
      boxShadow: "0px 102px 155px -58px rgba(0, 0, 0, 0.03)",
      borderRadius: "12px",
      cursor: "pointer",
      [theme.breakpoints.down("md")]: {
        height: "240px"
      },
      [theme.breakpoints.down("sm")]: {
        minWidth: "150px",
        height: "140px"
      }
    }),
    tab: (props: props) => ({
      maxWidth: "300px",
      minWidth: "215px",
      height: "205px",
      background: "#FBFBFB",
      border: "1px solid #E3E3E3",
      boxSizing: "border-box",
      boxShadow: "0px 102px 155px -58px rgba(0, 0, 0, 0.03)",
      borderRadius: "12px",
      cursor: "pointer",
      [theme.breakpoints.down("md")]: {
        height: "240px"
      },
      [theme.breakpoints.down("sm")]: {
        minWidth: "150px",
        height: "140px"
      }
    }),
    icon: {
      color: "#455154"
    },
    heading: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "24px",
      lineHeight: "100%",
      color: "#58696D",
      marginTop: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "14.8px",
        width: "100px"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12.8px",
        width: "100px"
      }
    },
    label: {
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      padding: theme.spacing(2)
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

export default function Label({
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
        elevation={selectedType !== type ? 0 : 3}
        onClick={() => setSelectedType(type)}
      >
        <section className={classes.label}>
          <h2 className={classes.heading}>{heading}</h2>
          {icon ? <span className={classes.icon}>{icon}</span> : ""}
        </section>
        <div className={classes.bottom}>
          <div>
            {details ? <div className={classes.details}>{details}</div> : ""}
            {selectedType === type ? (
              <div className={classes.check}>
                <MuiIcon icon="check" className={classes.icon} fontSize="small" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Paper>
      {error === true ? (
        <Typography variant="body2" className={classes.redText}>
          &nbsp;&nbsp;{helperText}
        </Typography>
      ) : null}
    </div>
  );
}