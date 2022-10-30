import * as React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ModalPopup from "Components/ModalPopup";
import ImageCropper from "./ImageCropper";
import Button from "Components/Button";
import MuiIcon from "Components/Icons";
import UploadComponent from "./UploadComponent";

interface Props {
  readonly handleSaveChanges: () => void;
  readonly handleCloseModal: () => void;
  readonly openModal: boolean;
  readonly blobImage?: string;
  readonly setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileImageName: React.Dispatch<React.SetStateAction<string>>
  setBlobImage: React.Dispatch<React.SetStateAction<Blob>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldLabel: {
      marginBottom: "0px",
      marginTop: "0px"
    },
    imageTitle: {
      fontSize: "12px",
      fontWeight: "bold"
    },
    changeImage: {
      position: "absolute",
      cursor: "pointer",
      right: "16px",
      top: "16px",
      // [theme.breakpoints.down("xs")]: {
      //   right: "25px",
      //   top: "56px",
      // }
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      alignItems: "center"
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
      justifyContent: "flex-end"
    }
  })
);

const AddImageModal: React.FC<Props> = props => {
  const classes = useStyles();
  const [imageData, setImageData] = React.useState<any>(null);

  React.useEffect(() => {
    if (props?.blobImage === "") setImageData(null)
  }, [props.blobImage])

  const handleSetImage = (file: File) => {
    setImageData({ ...imageData, image: file });
  };

  return (
    <ModalPopup maxWidth="md" modalTitle="Crop Image" noFooter={true} {...props}>
      {imageData?.image ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <div style={{ height: "400px", position: "relative" }}>
              <ImageCropper
                image={imageData?.image}
                setBlobImage={props.setBlobImage}
                setCloseModal={props.setOpenModal}
                setProfileImageName={props.setProfileImageName}
              />
            </div>
            <div className={classes.changeImage}>
              {/* <Button
                className={classes.buttonSave}
                text="Change"
                
                icon={<MuiIcon icon="loop" />}
              /> */}
              <MuiIcon icon="cancel" color="secondary" onClick={() => setImageData({ ...imageData, image: null })}/>
            </div>
          </Grid>
        </Grid>
      ) : (
        <UploadComponent handleSetImage={handleSetImage} close={props.handleCloseModal} />
      )}
    </ModalPopup>
  );
};

export default AddImageModal;
