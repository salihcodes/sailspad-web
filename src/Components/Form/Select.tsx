/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import AsyncSelect from "react-select/async";
import { Typography } from "@material-ui/core";

export type MultiOptions = {
  readonly label: string;
  readonly value: string;
  readonly phoneCode?: string;
  readonly countryCode: string;
};
export type Options = {
  readonly label: string;
  readonly value: string;
};
export type DefaultValue = Options | Options[] | MultiOptions[];
interface Props {
  readonly options: Options[] | MultiOptions[];
  readonly setValue: React.Dispatch<React.SetStateAction<DefaultValue>>;
  readonly multiple?: boolean;
  readonly value?: DefaultValue;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly id?: string;
  readonly name?: string;
  readonly style?: React.CSSProperties;
  readonly error?: boolean;
  readonly helperText?: string | false | undefined | unknown;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    redText: {
      color: "red",
      marginTop: "5px"
    }
  })
);

const Select: React.FC<Props> = props => {
  const defaultTheme = useTheme();
  const classes = useStyles();

  // commented for future use
  const handleChange = (newValue: any, actionMeta: any) => {
    props.setValue(newValue);
  };
  // // commented for future use
  // const handleInputChange = (newValue: any, actionMeta: any) => {

  // };
  const filterArr = (inputValue: string) => {
    return props.options.filter(i =>
      i.label.toString().toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string, callback: any) => {
    setTimeout(() => {
      callback(filterArr(inputValue));
    }, 1000);
  };

  return (
    <div>
      <AsyncSelect
        defaultOptions={props.options}
        id={props.id}
        value={props.value}
        isMulti={props.multiple}
        isLoading={props.loading}
        loadOptions={promiseOptions}
        placeholder={props.placeholder}
        name={props.name}
        isDisabled={props.disabled}
        onChange={handleChange}
        theme={theme => ({
          ...theme,
          borderRadius: 10,
          border: `1px solid #E3E3E3`,
          // colors: {
          //   ...theme.colors,
          //   // primary25: defaultTheme.palette.gray[100],
          //   primary: defaultTheme.palette.
          // }
        })}
      />
      {props.error ? (
        <Typography variant="body2" className={classes.redText}>
          &nbsp;&nbsp;{props.helperText}
        </Typography>
      ) : null}
    </div>
  );
};

export default Select;
