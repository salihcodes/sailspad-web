import * as React from 'react';
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import MuiIcon from 'Components/Icons';

interface Props {
  readonly success: boolean
  readonly message: string
  readonly subMessage?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24.1026px",
      lineHeight: "36px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: theme.palette.gray[400],
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
        lineHeight: "20px",
        textAlign: "start"
      }
    },
    infoVerify: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "24.1026px",
      lineHeight: "36px",
      display: "flex",
      alignItems: "center",
      color: "#0DA7F6",
      justifyContent: "center"
    },
    infoVerify2: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: theme.palette.gray[400],
      justifyContent: "center"
    },
    infoDenied: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "24.1026px",
      lineHeight: "36px",
      display: "flex",
      alignItems: "center",
      color: "#DE3737",
      justifyContent: "center"
    },
    infoDenied2: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: theme.palette.gray[400],
      justifyContent: "center"
    },
    verified: {
      textAlign: "center",
    },
    checkedIcon: {
      fontSize: "50px",
      color: "00b700"
    },
    unCheckedIcon: {
      fontSize: "50px",
      color: "red"
    },
  })
);

const ShowMessage: React.FC<Props> = ({ success, message, subMessage }: Props) => {
  const classes = useStyles();

  return <div className={classes.verified}>
    <div id={success === true ? "emailVerify" : "emailNotVerify"}>
      <MuiIcon
        className={success ? classes.checkedIcon : classes.unCheckedIcon}
        icon={success === true ? "CheckCircle" : "cancel"}
        fontSize="large"
      />
    </div>
    <div>
      <Typography className={success === true ? classes.infoVerify : classes.infoDenied}>
        {message}
      </Typography>
      {subMessage && (
        <>
          <br />
          <Typography className={success === true ? classes.infoVerify2 : classes.infoDenied2}>
            {subMessage}
          </Typography>
        </>
      )}

    </div>
  </div>;
};

export default ShowMessage;
