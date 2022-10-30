import * as React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ModalPopup from "Components/ModalPopup";
import UploadComponent from "./UploadComponent";

interface Props {
  readonly handleSaveChanges: () => void;
  readonly handleCloseModal: () => void;
  readonly openModal: boolean;
  readonly setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setImagePreview: React.Dispatch<React.SetStateAction<string>>;
    setBlobImage: React.Dispatch<React.SetStateAction<Blob>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldLabel: {
      marginBottom: "0px",
      marginTop: "0px",
    },
    imageTitle: {
      fontSize: "12px",
      fontWeight: "bold",
    },
    changeImage: {
      width: "250px",
      textAlign: "right",
      marginTop: "-68px",
      marginBottom: "17px",
      position: "absolute",
      right: "16%",
      [theme.breakpoints.down("sm")]: {
        textAlign: "left",
        marginTop: "8px",
      },
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      alignItems: "center",
    },
    switchBody: {},
    buttonsBody: { display: "flex" },
    buttonSave: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "30px",
      textAlign: "center",
      color: "#455154",
      background: "#FBFBFB",
      border: "0.642998px solid #E3E3E3",
      boxSizing: "border-box",
      boxShadow: "0px 19.9329px 32.7929px rgba(0, 0, 0, 0.03)",
      borderRadius: "64.2998px",
      padding: theme.spacing(2, 3),
      marginRight: "10%",
      justifyContent: "flex-end",
    },
  })
);

const AddMarkerModal: React.FC<Props> = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageData, setImageData] = React.useState<any>(null);

  const handleSetImage = (file: File) => {
    setImageData({ ...imageData, image: file });
  };

  return (
    <ModalPopup
      maxWidth="md"
      modalTitle="Crop Image"
      noFooter={true}
      {...props}
    >
      {imageData?.image ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <div style={{ height: "400px", position: "relative" }}></div>
            <div className={classes.changeImage}></div>
          </Grid>
        </Grid>
      ) : (
        <UploadComponent
          onClose={props.handleCloseModal} setImageResult={props.setBlobImage} setImagePreview={props.setImagePreview}
        />
      )}
    </ModalPopup>
  );
};

export default AddMarkerModal;
