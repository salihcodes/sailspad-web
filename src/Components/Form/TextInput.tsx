import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Loader from "Components/Loader";
import MuiIcons from "Components/Icons";
import CloseEye from "Components/Icons/closeEye";
import OpenEye from "Components/Icons/openEye";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputField: (props: Props) => ({
      fontFamily: "Poppins",
      background: "#FFFFFF",
      border: `1px solid ${theme.palette.gray[600]}`,
      color: "#5e6278",
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      outline: `none`,
      height: "40px",
      padding: props.username === true ? theme.spacing(2.5, 4, 2.5, 2.5) : theme.spacing(2),
      "&:focus": {
        outline: `2px solid ${theme.palette.info.main}`,
        color: "#5e6278"
      },
      "&::placeholder": {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "26px",
        color: theme.palette.gray[400]
      }
    }),
    label: {
      color: theme.palette.gray[500],
      fontSize: "12px"
    },
    textGrid: {
      display: "flex",
      alignItems: "center"
    },
    labelDiv: {
      minWidth: "130px"
    },
    redText: {
      color: "red"
    },
    loaderDiv: {
      marginLeft: -30
    },
    checkedDiv: {
      marginLeft: -30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    checkIcon: {
      color: "green"
    },
    inputContainer: {
      position: "relative",
      width: "100%",
      display: "flex",
      "&>span": {
        position: "absolute",
        top: "30%",
        right: "4%",
        cursor: "pointer"
      }
    }
  })
);

interface Props {
  readonly type: string;
  readonly id?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly variant?: "filled" | "standard" | "outlined";
  readonly style?: React.CSSProperties;
  readonly name: string;
  readonly value?: string | number;
  readonly label?: string;
  readonly username?: boolean;
  readonly isMultiline?: boolean;
  readonly placeholder?: string;
  readonly margin?: "dense" | "none";
  readonly rows?: number;
  readonly maxLength?: number;
  readonly minRows?: number;
  readonly maxRows?: number;
  readonly error?: boolean;
  readonly helperText?: string | false | undefined;
  readonly loading?: boolean;
  readonly isValid?: boolean;
  readonly autoFocus?: boolean;
  readonly required?: boolean;
  readonly pattern?: string;
  readonly autoComplete?: string;
  readonly onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  readonly onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly onFocus?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => void;
}

const TextInput: React.FC<Props> = props => {
  const {
    type,
    id,
    onChange,
    value,
    name,
    label,
    placeholder,
    disabled,
    style,
    helperText,
    error,
    required,
    className,
    maxLength,
    onKeyUp,
    onKeyDown,
    loading,
    onFocus,
    pattern,
    autoComplete,
    isValid,
    ...otherProps
  } = props;
  const classes = useStyles(props);
  const [showPassowrd, setShowPassword] = React.useState<boolean>(false);

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item lg={12} xs={12} className={classes.textGrid}>
        {label && (<div className={classes.labelDiv}><span className={classes.label}>{label}:</span></div>)}
        <div className={classes.inputContainer}>
          <input
            autoComplete={autoComplete}
            className={className ? className : classes.inputField}
            type={showPassowrd ? "text" : type}
            id={id}
            name={name}
            value={value}
            disabled={disabled}
            pattern={pattern}
            placeholder={placeholder}
            onChange={onChange}
            style={style}
            maxLength={maxLength}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            {...otherProps}
            required={required}
          />
          {type === "password" && (
            <span>
              {!showPassowrd ? <CloseEye onClick={() => setShowPassword(!showPassowrd)} /> : <OpenEye onClick={() => setShowPassword(!showPassowrd)} />}
            </span>
          )}
          {isValid && !loading && (<div className={classes.checkedDiv}><MuiIcons icon="checkOutlined" fontSize="small" className={classes.checkIcon} /></div>)}
        </div>

        {loading && (<div className={classes.loaderDiv}><Loader /></div>)}

      </Grid>

      {error && (
        <Grid item lg={12}>
          <Typography variant="body2" className={classes.redText}>
            &nbsp;&nbsp;{helperText}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default TextInput;
