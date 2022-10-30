import * as React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { creditCardImage } from "./CCType";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputField: {
      fontFamily: "Poppins",
      background: "#FFFFFF",
      border: `1px solid ${theme.palette.gray[600]} !important`,
      color: "#5e6278",
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      outline: `none`,
      height: "40px",
      padding: theme.spacing(2),
      "&:focus": {
        outline: `2px solid ${theme.palette.info.main} !important`,
        color: "#5e6278"
      },
      "& .PrivateNotchedOutline-root-386": {
        display: "none !important"
      },
      "& ::placeholder": {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "26px",
        color: theme.palette.gray[400]
      }
    },

    label: {
      color: theme.palette.gray[500],
      fontSize: "12px"
    },
    textGrid: {
      display: "flex",
      alignItems: "center",
      height: "50px",
      position: "relative",
      "& .MuiInputBase-input": {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "26px"
      },
      "& .MuiTextField-root": {
        border: "none !important"
      }
    },
    labelDiv: {
      minWidth: "130px"
    },
    cardImageDiv: {
      position: "absolute",
      right: "15px",
      top: "10px"
    }
  })
);

interface Props {
  readonly type: string;
  readonly label?: string;
  readonly masking?: boolean;
  readonly onChange: (name: string, value: string) => void;
  readonly onFocus?: (e: any) => void;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly style?: React.CSSProperties;
  readonly name: string;
  readonly value?: string | number;
  readonly placeholder?: string;
  readonly limit?: number;
  readonly showMask?: boolean;
  readonly maskType?: "card" | "expDate" | "ccv" | "transaction" | "phone" | "number";
  readonly cardImage?: boolean;
}

function limit(val: string, max: string) {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }
  if (val.length === 2) {
    if (Number(val) === 0) {
      val = "01";
    } else if (val > max) {
      val = max;
    }
  }
  return val as string;
}

function cardExpiry(val: string) {
  const month = limit(val.substring(0, 2), "12");
  const year = val.substring(2, 4);

  return month + (year.length ? "/" + year : "");
}

const NumberFormatCustom: React.FC<Props> = props => {
  const {
    onChange,
    onFocus,
    maskType,
    showMask,
    cardImage,
    value,
    limit,
    name,
    required,
    placeholder,
    disabled,
    label
  } = props;
  const classes = useStyles();
  const withValueLimit = ({ floatValue }: NumberFormatValues) =>
    !!(limit ? floatValue && floatValue <= limit : true);

  const maskInputFormat =
    maskType === "card"
      ? "#### #### #### ####"
      : maskType === "expDate"
        ? cardExpiry
        : maskType === "ccv"
          ? "###"
          : maskType === "phone"
            ? "+# (###) ###-####"
            : maskType === "number"
              ? "####################"
              : undefined;

  const cardType = creditCardImage(value)

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item lg={12} xs={12} className={classes.textGrid}>
        {label && (
          <div className={classes.labelDiv}>
            <span className={classes.label}>{label}:</span>
          </div>
        )}

        <NumberFormat
          format={maskInputFormat}
          // customInput={TextField}
          value={value}
          className={classes.inputField}
          mask={showMask ? "_" : ""}
          thousandSeparator
          placeholder={placeholder}
          isNumericString
          allowNegative={false}
          required={required}
          prefix="$"
          isAllowed={withValueLimit}
          disabled={disabled}
          onValueChange={values => {
            onChange(name, values.value);
          }}
          name={name}
          onFocus={onFocus}
        />

        {cardImage &&
          <div className={classes.cardImageDiv}>
            {cardType}
          </div>
        }
      </Grid>
    </Grid>
  );
};
export default NumberFormatCustom;
