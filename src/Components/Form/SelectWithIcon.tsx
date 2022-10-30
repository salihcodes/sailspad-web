import * as React from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { Typography } from "@material-ui/core";

export type Options = {
  readonly label: string;
  readonly value: string;
  readonly icon?: React.ReactNode;
};

export type DefaultValue = Options | Options[];

interface Props {
  readonly options: Options[];
  readonly value?: string;
  readonly style?: React.CSSProperties;
  readonly error?: boolean;
  readonly helperText?: string | false | undefined | unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly handleChange?: (e: any) => void;
  readonly type?: "light" | "dark";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    redText: {
      color: "red",
      marginTop: "5px"
    },
    selectDiv: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "cenetr"
    },
    optionText: {
      margin: "0px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "8px"
      }
    }
  })
);

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      },
      "&:focused": {
        color: "yellow"
      }
    },
    input: {
      borderRadius: "8px",
      width: "90px",
      position: "relative",
      color: "#58696D",
      backgroundColor: theme.palette.gray[100],
      border: `1px solid ${theme.palette.gray[600]}`,
      fontSize: 13,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: ["Poppins"].join(","),
      "&:focus": {
        borderRadius: "8px",
        backgroundColor: theme.palette.gray[100],
        borderColor: theme.palette.gray[100]
        // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      },
      [theme.breakpoints.down("xs")]: {
        width: "17vw"
      }
    }
  })
)(InputBase);

const BootstrapInputDark = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      },
      "&:focused": {
        color: "yellow"
      }
    },
    input: {
      borderRadius: "8px",
      width: "90px",
      position: "relative",
      color: "#58696D",
      backgroundColor: theme.palette.gray[100],
      border: `1px solid ${theme.palette.gray[600]}`,
      fontSize: 13,
      padding: "10px 26px 10px 10px",
      // transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: ["Poppins"].join(","),
      "&:focus": {
        borderRadius: "8px",
        backgroundColor: theme.palette.gray[100],
        borderColor: theme.palette.gray[600]
        // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      },
      [theme.breakpoints.down("md")]: {
        width: "66px",
        fontSize: "10px",
        padding: "10px 0px 10px 5px"
      },
      [theme.breakpoints.down("xs")]: {
        width: "17vw"
      }
    }
  })
)(InputBase);

export const SelectWithInput: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <Select
          style={props.style}
          value={props.value}
          onChange={props.handleChange}
          input={
            props.type === "light" ? (
              <BootstrapInput />
            ) : props.type === "dark" ? (
              <BootstrapInputDark />
            ) : (
              <BootstrapInput />
            )
          }
        >
          {props.options.map((option, i) => (
            <MenuItem value={option.value} key={i}>
              <div className={classes.selectDiv} style={{ alignItems: "center" }}>
                {option.icon}
                &nbsp;
                <p className={classes.optionText}>{option.label}</p>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {props.error ? (
        <Typography variant="body2" className={classes.redText}>
          &nbsp;&nbsp;{props.helperText}
        </Typography>
      ) : null}
    </div>
  );
};
