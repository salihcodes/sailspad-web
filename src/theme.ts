import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    gray: PaletteOptions["gray"];
    green: PaletteOptions["green"];
  }
  interface PaletteOptions {
    gray: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      900: string;
      700: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
      1500: string;
      grayBg: string;
    };
    green: {
      success: string;
      successBg: string;
    };
  }
}
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#2196f3",
        dark: "#2196f3",
        light: "#64b5f6",
      },
      secondary: {
        main: "#414546",
        light: "#58696D",
        dark: "#455154",
      },
      info: {
        main: "#0DA7F6"
      },
      text: {
        primary: "#1A202E",
        secondary: "#475569"
      },
      background: {
        default: "rgba(0,0,0, 0.1)",
        paper: "#FFFFFF"
      },
      gray: {
        100: "#FBFBFB",
        200: "#EFF2F3",
        300: "#F5F4F4",
        400: "#A0A9AB",
        500: "#414546",
        600: "#E3E3E3",
        700: "#E4E9EA",
        900: "#58696D",
        1000: "#F1F5F9",
        1100: "#AEBABF",
        1200: "#64748B",
        1300: "#AC0C3C",
        1400: "#ECFFEC",
        1500: "#252D38",
        grayBg: "#e6e9ea"
      },
      green: {
        success: "#27C324",
        successBg: "#ECFFEC"
      }
    },
    typography: {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeightBold: 500,

      body1: {
        fontSize: 14,
        fontWeight: 400,
        color: "#475569"
      },
      body2: {
        color: "#97A6BA",
        fontSize: 14,
        fontWeight: 400
      },
      subtitle1: {
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "21px"
      },
      button: {
        borderRadius: 6,
        fontSize: 12,
        lineHeight: "18px",
        fontWeight: 400
      }
    },
    overrides: {
      MuiPopover: {
        paper: {
          // backgroundColor: "rgba(88, 105, 109, 0.2)",
          // backdropFilter: "blur(10px)",
        }
      },
      MuiChip: {
        deletable: {
          background: "white"
        }
      },
      MuiButton: {
        root: {
          borderRadius: 6,
          textTransform: "initial",
          height: "40px",
          fontSize: "13px",
          "&:disabled": {
            background: "#E6EBEE"
          }
        },

        containedPrimary: {
          fontSize: 12,
          fontWeight: 500,
          lineHeight: "18px",
          padding: "8px 14px"
        }
      },
      MuiIconButton: {
        root: {},
        sizeSmall: {
          height: "37px",
          width: "37px",
          marginTop: "4px"
        }
      },
      MuiTextField: {
        root: {
          border: "1px solid #f5f8fa !important",
          background: "red important",
          color: "red important"
        }
      },
      MuiInputBase: {
        root: {}
      },
      MuiStepIcon: {
        root: {
          color: "#FBFBFB",
          height: "50px",
          fontSize: "39px",
          marginLeft: "-8px",
          "@media (max-width: 1024px)": {
            fontSize: "30px"
          },
          "&.MuiStepIcon-active": {
            color: "#FBFBFB",
            "&.MuiStepIcon-text": {
              fill: "#58696D"
            }
          },
          "&.MuiStepIcon-completed": {
            color: "#FBFBFB",
            "&.MuiStepIcon-text": {
              fill: "#58696D"
            }
          }
        },
        text: {
          fill: "#58696D"
        }
      },
      MuiStepLabel: {
        label: {
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "22px",
          marginLeft: "5px",
          color: "#A0A9AB",
          "@media (max-width: 1024px)": {
            fontSize: "14px"
          },
          "&.MuiStepLabel-active": {
            color: "#455154"
          },
          "&.MuiStepLabel-completed": {
            color: "#A0A9AB"
          },
          "@media (max-width:600px)": {
            fontSize: "16px"
          }
        }
      },
      MuiStepConnector: {
        lineVertical: {
          borderLeftStyle: "none"
        },
        lineHorizontal: {
          display: "none"
        }
      },
      MuiRadio: {
        root: {
          display: "none"
        }
      },
      MuiFormGroup: {
        root: {
          flexWrap: "nowrap"
        }
      },
      MuiPaper: {
        elevation1: {
          boxShadow: "none"
        },
        root: {
          borderRadius: "11px"
        },
        rounded: {
          borderRadius: "11px"
        }
      }
    },
    props: {
      MuiButton: {
        color: "primary"
      },
      MuiTextField: {
        variant: "outlined",
        margin: "dense"
      }
    }
  })
);
export const maxContainerWidth = "1250px";
export default theme;
