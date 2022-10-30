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
  // readonly setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setProfileImageName: React.Dispatch<React.SetStateAction<string>>
  // setBlobImage: React.Dispatch<React.SetStateAction<Blob>>
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
      display: "flex",
      alignItems: "center",
      justifyContent: 'flex-end',
      marginBottom: "17px",

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
      // marginRight: "10%",
      justifyContent: "flex-end"
    }
  })
);

const AddImageModal: React.FC<Props> = props => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageData, setImageData] = React.useState<any>(null);
  const [image, setImage] = React.useState<any>();

  React.useEffect(() => {
    if (imageData?.image) {
      const blob = URL?.createObjectURL(imageData?.image);
      setImage(blob);
    }
  }, [imageData]);

  const handleSetImage = (file: File) => {
    setImageData({ ...imageData, image: file });
  };

  const onSave = async () => {
    await props.handleCloseModal()
    setImageData({ ...imageData, image: null });
    setImage(null);
  }
  return (
    <ModalPopup maxWidth="md" modalTitle="Crop Image" noFooter={true} {...props}>
      {imageData?.image && image ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <div style={{ height: "400px", position: "relative" }}>
              <img src={image} style={{
                width: '100%',
                height: "370px",
                objectFit: 'contain'
              }} alt="" />
            </div>
            <div className={classes.changeImage}>
              <Button
                className={classes.buttonSave}
                text="Change Image"
                onClick={() => { setImageData({ ...imageData, image: null }); setImage(null) }}
                icon={<MuiIcon icon="loop" />}
              />
              &nbsp;
              &nbsp;
              <Button
                className={classes.buttonSave}
                text="Save"
                onClick={() => onSave()}
              // icon={<MuiIcon icon="loop" />}
              />
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
