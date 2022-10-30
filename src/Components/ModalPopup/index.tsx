import * as React from "react";
import { createStyles, Theme, withStyles, makeStyles } from "@material-ui/core/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import MuiIcons from "Components/Icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(1.5)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
    checkBoxDiv: {
      margin: "10px"
    },
    titleSection: {
      display: "flex",
      alignItems: "center"
    },
    title: {
      width: "100%",
      paddingLeft: theme.spacing(2)
    },
    modalButtons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    paper: {
      backgroundColor: theme.palette.gray[100],
      border: `2px solid rgba(227, 227, 227, 0.8)`,
      boxShadow: "0px 138px 189px -76px rgba(0, 0, 0, 0.06)",
      width: "100%",
      minHeight: "38%",
      maxHeight: "75%",
      maxWidth: "754px",
      borderRadius: "27px !important",
      overflowY: "auto",
      "&:focus": {
        outline: "none"
      },
      [theme.breakpoints.down("md")]: {
        maxHeight: "100%",
        borderRadius: "0px",
        overflowY: "auto",
      },
      [theme.breakpoints.down("xs")]: {
        background: theme.palette.gray[200],
        borderRadius: "0px !important",
      }
    },
    backdrop: {
      backgroundColor: "transparent"
    },
    icon: {
      cursor: "pointer",
      margin: theme.spacing(1, 1, 0, 1)
    }
  })
);
export interface DialogTitleProps {
  readonly id: string;
  readonly children: React.ReactNode;
  readonly onClose: () => void;
}
interface Props {
  readonly handleSaveChanges: () => void;
  readonly handleCloseModal: () => void;
  readonly openModal: boolean;
  readonly children: React.ReactNode;
  readonly footerButton?: React.ReactNode;
  readonly maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  readonly modalTitle?: string;
  readonly saveBtnText?: string;
  readonly noHeader?: boolean;
  readonly noFooter?: boolean;
  readonly disableSaveBtn?: boolean;
  readonly checkBox?: {
    readonly text?: string;
    readonly value: boolean;
    readonly handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.titleSection}>
        <div className={classes.title}>
          <Typography variant="h6">{children}</Typography>
        </div>
        <div>
          {onClose && (<MuiIcons className={classes.icon} icon="close" fontSize="large" color="secondary" onClick={onClose} />)}
        </div>
      </div>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: "406px",
  }
}))(MuiDialogContent);


const ModalPopup: React.FC<Props> = props => {
  const classes = useStyles()
  const {
    handleCloseModal,
    openModal,
    children,
    maxWidth,
    modalTitle,
    noHeader,
  } = props;
  // const classes = useStyles();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Dialog
        fullScreen={isMobile}
        fullWidth={true}
        maxWidth={maxWidth}
        onClose={handleCloseModal}
        BackdropProps={{ className: classes.backdrop }}
        PaperProps={{ className: classes.paper }}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        {/* {!noHeader && (
          <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
            {modalTitle}
          </DialogTitle>
        )} */}

        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPopup;
