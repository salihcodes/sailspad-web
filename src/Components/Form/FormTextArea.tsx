import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Loader from "Components/Loader";
import MuiIcons from "Components/Icons";
import { UseFormRegister } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputField: {
      fontFamily: "Poppins",
      background: "#FFFFFF",
      border: "1px solid #E3E3E3",
      color: "#5e6278",
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      outline: "none",
      height: "40px",
      padding: theme.spacing(1.5),
      resize: "none",
      "&:focus": {
        color: "#5e6278",
        outline: `2px solid ${theme.palette.info.main}`,
      }
    },
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
    checkIcon: {
      color: "green"
    }
  })
);

interface Props {
  readonly id?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly variant?: "filled" | "standard" | "outlined";
  readonly style?: React.CSSProperties;
  readonly name: string;
  readonly value?: string | number;
  readonly label?: string;
  readonly isMultiline?: boolean;
  readonly placeholder?: string;
  readonly margin?: "dense" | "none";
  readonly rows?: number;
  readonly columns?: number;
  readonly maxLength?: number;
  readonly minRows?: number;
  readonly maxRows?: number;
  readonly error?: boolean;
  readonly loading?: boolean;
  readonly checked?: boolean;
  readonly helperText?: string | false | undefined;
  readonly autoFocus?: boolean;
  readonly register: UseFormRegister<any>;
}

const FormTextArea: React.FC<Props> = props => {
  const {
    id,
    register,
    value,
    name,
    label,
    placeholder,
    disabled,
    style,
    helperText,
    error,
    className,
    columns,
    rows,
    loading,
    maxLength,
    checked
  } = props;
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item lg={12} xs={12} className={classes.textGrid}>
        {label && (
          <div className={classes.labelDiv}>
            <span className={classes.label}>{label}:</span>
          </div>
        )}
        <textarea
          className={className ? className : classes.inputField}
          id={id}
          rows={rows}
          cols={columns}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          style={style}
          {...register(name)}
        />
        {loading && (
          <div className={classes.loaderDiv}>
            <Loader />
          </div>
        )}
        {checked && !loading ? (
          <div className={classes.loaderDiv}>
            <MuiIcons icon="checkOutlined" className={classes.checkIcon} />
          </div>
        ) : null}
      </Grid>

      {error ? (
        <Grid item lg={12}>
          <Typography variant="body2" className={classes.redText}>
            &nbsp;&nbsp;{helperText}
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FormTextArea;
