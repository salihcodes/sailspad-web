import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CalendarPicker from '@mui/lab/CalendarPicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputField: (props: Props) => ({
      width: "70% !important",
      height: "50px !important",
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.gray[600]} !important`,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      // outline: props.error ? `2px solid red` : "none",
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
      padding: theme.spacing(0.25),
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#DE3737",
      marginLeft: "10px"
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
  readonly helperText?: string | false | FormikErrors<Date> | undefined;
  readonly openCalender?: boolean;
  onChange: (date: InputDateType) => void;
}

const CustomDatePicker: React.FC<Props> = props => {
  const { label, error, helperText, value, name, disabled, openCalender, onChange } = props;
  const classes = useStyles(props);

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
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
            renderInput={(params) => <TextField variant='outlined' className={classes.inputField}  {...params} />}
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
    </Grid>
  );
};

export default CustomDatePicker;
