import * as React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import Cards, { Focused } from "react-credit-cards";
import TextInput from "Components/Form/TextInput";
import MaskingInput from "Components/Form/MaskingInput";
import Select, { DefaultValue } from "Components/Form/Select";
import { CountryData } from "Components/SignUpStepper/Data/Countries";

type CreditCardInputs = {
  number: string | number;
  expiry: string;
  cvc: string | number;
  name: string;
  country: string;
};

interface Props {
  stateValue?: CreditCardInputs;
  focusedInput: Focused;
  formik?: any;
  handleChange: (value: any, fieldName: string) => void;
  handleFocus?: (e: any) => void;
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  cancelButton?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContent: {
      // maxHeight: "700px",
      // overflowY: "auto",
      paddingBottom: theme.spacing(3),
    },
    stepHeading: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "45px",
      color: "#58696D",
      marginBottom: "10px",
      // [theme.breakpoints.down("sm")]: {
      //   fontSize: "18px"
      // }
    },
    inputFeild: {
      paddingBottom: theme.spacing(1),
    },
    cancelText: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
      color: "#58696D",
      cursor: "pointer",
      marginLeft: "5px",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export const CreditCardInputs: React.FC<Props> = ({
  formik,
  cancelButton,
  show,
  setShow,
  stateValue,
  handleChange,
  handleFocus,
  focusedInput,
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // states
  const [country, setCountry] = React.useState<DefaultValue>({
    label: "Country",
    value: "Not Available",
  });
  const [selectedCountry, setSelectedCountry] = React.useState<string>("");

  return (
    <Grid className={classes.mainContent} container justifyContent="flex-start">
      <Grid item xs={12}>
        <Grid
          className={classes.inputFeild}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={9}>
            <MaskingInput
              type="text"
              showMask={true}
              maskType="card"
              name="number"
              placeholder="1234 1234 1234 1234"
              value={formik.values?.number}
              onChange={(name, value) => handleChange(value, "number")}
              onFocus={handleFocus}
              required={true}
              cardImage={true}
            />
          </Grid>
          <Grid item xs={3}>
            {/* {formik.touched.name && Boolean(formik.errors.name) &&
        <Typography className={classes.error}>{formik.touched.name && formik.errors.name}</Typography>
      } */}
          </Grid>
        </Grid>

        <Grid
          className={classes.inputFeild}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MaskingInput
                  type="text"
                  showMask={true}
                  maskType="expDate"
                  name="expiry"
                  placeholder="MM / YY"
                  value={formik.values?.expiry}
                  onChange={(name, value) => handleChange(value, "expiry")}
                  onFocus={handleFocus}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <MaskingInput
                  type="text"
                  showMask={true}
                  maskType="ccv"
                  name="cvc"
                  placeholder="CCV"
                  value={formik.values?.cvc}
                  onChange={(name, value) => handleChange(value, "cvc")}
                  onFocus={handleFocus}
                  required={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            {/* {formik.touched.email && Boolean(formik.errors.email) &&
        <Typography className={classes.error}>{formik.touched.email && formik.errors.email}</Typography>
      } */}
          </Grid>
        </Grid>

        <Grid
          className={classes.inputFeild}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={9}>
            <TextInput
              // style={{ border: "none", fontSize: "20px" }}
              type="text"
              name="name"
              placeholder="Name on Card"
              value={formik.values?.name}
              onChange={formik.handleChange}
              onFocus={handleFocus}
              required={true}
            />
            <div style={{ marginTop: "12px" }}>
              <Select
                options={CountryData}
                value={country}
                setValue={(value: any) => {
                  setCountry(value);
                  formik.setFieldValue("country", value?.label, true);
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      {cancelButton && (
        <Typography
          className={classes.cancelText}
          onClick={() => setShow(false)}
        >
          Cancel
        </Typography>
      )}
    </Grid>
  );
};
