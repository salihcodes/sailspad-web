import * as React from "react";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { UseFormRegister } from "react-hook-form";
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
      height: "40px",
      outline: props.error ? `2px solid red` : "none",
      padding: props.username === true ? theme.spacing(2.5, 4, 2.5, 2.5) : theme.spacing(2.5),
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
    tollTipIcon: {
      color: "red"
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
      },

    },
    toolTip: (props: Props) => ({
      position: "absolute",
      top: "25%",
      right: props.type === "password" ? "15%" : "4%",
      cursor: "pointer"
    })
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
  readonly label?: string;
  readonly username?: boolean;
  readonly placeholder?: string;
  readonly error?: boolean;
  readonly helperText?: any;
  readonly loading?: boolean;
  readonly isValid?: boolean;
  readonly autoFocus?: boolean;
  readonly defaultValue?: string | number
  readonly register: UseFormRegister<any>;
  readonly onChangeFunction?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormInput: React.FC<Props> = props => {
  const {
    type,
    id,
    register,
    name,
    label,
    onChangeFunction,
    placeholder,
    disabled,
    style,
    helperText,
    error,
    className,
    loading,
    defaultValue,
    isValid,
    ...otherProps
  } = props;
  const classes = useStyles(props);
  const [showPassowrd, setShowPassword] = React.useState<boolean>(false);

  return (
    <Grid style={{ position: "relative" }} container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item lg={12} xs={12} className={classes.textGrid}>
        {label && (<div className={classes.labelDiv}><span className={classes.label}>{label}:</span></div>)}
        <div className={classes.inputContainer}>
          <input
            className={className ? className : classes.inputField}
            type={showPassowrd ? "text" : type}
            id={id}
            defaultValue={defaultValue}
            // name={name}
            disabled={disabled}
            placeholder={placeholder}
            // onChange={onChange}
            style={style}
            {...register(name, { onChange: onChangeFunction })}
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

      {/* {error && (
        <Grid item lg={12}>
          <Typography variant="body2" className={classes.redText}>
            &nbsp;&nbsp;{helperText}
          </Typography>
        </Grid>
      )} */}

      {/* {error && !loading && (
        <Tooltip className={classes.toolTip} arrow placement="left" title={helperText}>
          <button style={{ textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>
            <MuiIcons icon="info" fontSize="small" className={classes.tollTipIcon} />
          </button>
        </Tooltip>
      )} */}
    </Grid>
  );
};

export default FormInput;
