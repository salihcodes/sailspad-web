import * as React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Loader from "../Loader";

interface Props {
  readonly size?: "medium" | "small";
  readonly text?: string;
  // This should be renamed to something like colorClass etc.
  // TODO: fix naming of this prop
  readonly type?:
  | "secondary"
  | "secondaryOutlined"
  | "primary"
  | "primaryOutlined"
  | "neutral"
  | "darkOutlined"
  | "stepper"
  | "started"
  | "proceed" | "grey";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly loading?: boolean;
  readonly icon?: React.ReactElement;
  readonly endIcon?: React.ReactElement;
  readonly midIcon?: React.ReactElement;
  readonly onlyIcon?: boolean;
  readonly variant?: "text" | "outlined" | "contained";
  readonly style?: React.CSSProperties;
  readonly submit?: "submit";
  readonly className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    secondary: {
      background: "#FFFFFF",
      border: `0.5px solid ${theme.palette.gray[300]}`,
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      borderRadius: "6px",
      color: theme.palette.gray[900],
      fontWeight: 500
    },
    secondaryOutlined: {
      textTransform: "initial",
      border: `0.5px solid ${theme.palette.gray[300]}`,
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      borderRadius: "6px",
      color: theme.palette.gray[300],
      fontWeight: 500
    },
    primary: {
      "&:hover": {
        border: `1px solid ${theme.palette.gray[600]}`,
        color: theme.palette.secondary.dark,
        background: theme.palette.gray[100]
      },
      border: `1px solid ${theme.palette.gray[600]}`,
      background: theme.palette.gray[100],
      boxShadow: "0px 36px 79px rgba(0, 0, 0, 0.13)",
      backdropFilter: "blur(70px)",
      borderRadius: "64px",
      color: theme.palette.secondary.dark,
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "30px",
      textAlign: "center"
    },
    primaryOutlined: {
      border: `0.5px solid ${theme.palette.info.main}`,
      background: "white",
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      borderRadius: "6px",
      color: theme.palette.info.main,

      fontWeight: 500
    },
    darkOutlined: {
      border: `1.04957px solid ${theme.palette.secondary.dark}`,
      filter: "drop-shadow(0px 32.5367px 53.5282px rgba(0, 0, 0, 0.03))",
      borderRadius: "100.957px",
      color: theme.palette.secondary.dark,
      height: "auto",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "8.39657px",
      "&:hover": {
        background: theme.palette.gray[100]
      }
    },
    neutral: {
      background: "transparent",
      margin: "0 auto",
      // boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      // borderRadius: "6px",
      // fontWeight: 500,
      // color: theme.palette.gray[500],
      "&:hover": {
        background: "transparent"
      }
    },
    stepper: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      fontSize: "18px",
      width: "113px",
      justifyContent: "center",
      background: "#FFFFFF",
      color: theme.palette.secondary.dark,
      border: `1px solid ${theme.palette.gray[600]}`,
      boxSizing: "border-box",
      borderRadius: "17.5115px",
      margin: theme.spacing(1),
      padding: theme.spacing(0.75, 2)
    },
    started: {
      background: theme.palette.gray[700],
      borderRadius: "56px",
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "20px",
      textTransform: "uppercase",
      color: theme.palette.secondary.dark
    },
    proceed: {
      padding: theme.spacing(3, 9),
      background: theme.palette.gray[700],
      borderRadius: "56px",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: theme.palette.secondary.dark,
      [theme.breakpoints.down("sm")]: {
        background: "#FFFFFF",
        border: `1px solid ${theme.palette.gray[600]}`
      }
    },
    grey: {
      fontFamily: "Poppins",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      fontSize: "18px",
      width: "113px",
      justifyContent: "center",
      background: theme.palette.gray[100],
      color: theme.palette.gray[900],
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03) !important",
      boxSizing: "border-box",
      borderRadius: "17.5115px",
      margin: theme.spacing(1),
      padding: theme.spacing(0.75, 2)
    },
    loaderSpan: {
      margin: "auto"
    },
    flexAlign: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      fontSize: "14px"
    },
    loader: {
      paddingBottom: "3px"
    }
  })
);

const CustomButton: React.FC<Props> = ({
  text,
  onClick,
  type,
  disabled,
  icon,
  size,
  onlyIcon,
  variant,
  style,
  fullWidth,
  loading,
  submit,
  endIcon,
  midIcon,
  className
}) => {
  const classes = useStyles();
  return !onlyIcon ? (
    <Button
      variant={variant}
      className={`${type ? classes[type] : className ? className : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      size={size}
      style={style}
      fullWidth={fullWidth}
      type={submit}
      startIcon={icon}
      endIcon={endIcon}
    >
      <div className={classes.loaderSpan}>
        {loading ? (
          <div className={classes.loader}>
            <Loader />
          </div>
        ) : (
          <div className={classes.flexAlign}>
            {text}
            {midIcon ? <>&nbsp;&nbsp; {midIcon}</> : null}
          </div>
        )}
      </div>
    </Button>
  ) : (
    <IconButton
      style={style}
      className={`${type ? classes[type] : ""}`}
      onClick={onClick}
      size={size}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
};

export default CustomButton;
