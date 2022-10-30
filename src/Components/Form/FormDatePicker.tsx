import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import MuiIcons from "Components/Icons";
import CalendarPicker from '@mui/lab/CalendarPicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik'
import { UseFormRegister } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputField: (props: Props) => ({
      width: "100% !important",
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.gray[600]} !important`,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      outline: props.error ? `2px solid red` : "none",
    }),
    calenderDiv: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.gray[600]} !important`,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      width: "fit-content",
      maxHeight: "325px",
      overflow: "hidden"
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
    toolTip: {
      position: "absolute",
      top: "32%",
      right: "12%",
      cursor: "pointer"
    },
    tollTipIcon: {
      color: "red"
    },
  })
);

export type InputDateType = Date | string | number | null;

interface Props {
  readonly disabled?: boolean;
  readonly className?: string;
  readonly variant?: "filled" | "standard" | "outlined";
  readonly style?: React.CSSProperties;
  readonly name: string;
  readonly value: InputDateType
  readonly label?: string;
  readonly error?: boolean;
  readonly helperText?: any;
  readonly openCalender?: boolean;
  onChange: (date: InputDateType) => void;
}

const CustomDatePicker: React.FC<Props> = props => {
  const { label, error, helperText, value, name, disabled, openCalender, onChange } = props;
  const classes = useStyles(props);

  return (
    <Grid style={{ position: "relative" }} container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item lg={12} xs={12}>
        {label && (<div className={classes.labelDiv}><span className={classes.label}>{label}:</span></div>)}
        {openCalender ? <div className={classes.calenderDiv}>
          <CalendarPicker date={value} onChange={(newDate) => onChange(newDate)} disableFuture />
        </div>
          :
          <DesktopDatePicker
            disableFuture
            disabled={disabled}
            className={classes.inputField}
            value={value}
            onChange={(newValue) => { onChange(newValue); }}
            renderInput={(params) => <TextField variant='outlined' className={classes.inputField} {...params} />}
          />
        }
      </Grid>

      {error && (
        <Grid item lg={12}>
          <Typography variant="body2" className={classes.redText}>
            &nbsp;&nbsp;{helperText}
          </Typography>
        </Grid>
      )}
      {/* {error && (
        <Tooltip className={classes.toolTip} arrow placement="left" title={helperText}>
          <button style={{ textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>
            <MuiIcons icon="info" fontSize="small" className={classes.tollTipIcon} />
          </button>
        </Tooltip>
      )} */}
    </Grid>
  );
};

export default CustomDatePicker;
