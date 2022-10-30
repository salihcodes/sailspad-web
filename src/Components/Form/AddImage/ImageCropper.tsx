import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import Button from "Components/Button";
import { Point, Area } from "react-easy-crop/types";
import MuiIcons from "Components/Icons";
import getCroppedImg from "./cropper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      top: "29px",
      left: "0px",
      right: "0px",
      bottom: "10px",
      position: "absolute",
      maxWidth: "600px",
      margin: "auto"
    },
    cropContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: "80px",
      "& > div": {
        borderRadius: "5px"
      }
    },
    controls: {
      position: "absolute",
      bottom: 0,
      left: "20%",
      width: "40%",
      transform: "translateX(-50%)",
      height: "80px",
      display: "flex",
      color: theme.palette.gray[400],
      alignItems: "center"
    },
    slider: {
      color: theme.palette.secondary.dark,
      padding: "22px 0px"
    },
    footerWrapper: {
      position: "absolute",
      bottom: "7%",
      right: "8%",
      width: "65px",
      [theme.breakpoints.down("xs")]: {
        right: "0px",
        bottom: "8%",
      }
    },
    footer: {
      display: "flex",
      justifyContent: "end",
      marginTop: "20px",
      alignItems: "center"
    },
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
    }
  })
);

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly image: any; //dont know the type of file
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBlobImage: React.Dispatch<React.SetStateAction<Blob>>
  setProfileImageName: React.Dispatch<React.SetStateAction<string>>
}
const ImageCropper: React.FC<Props> = ({
  image,
  setCloseModal,
  setBlobImage,
  setProfileImageName
}) => {
  const classes = useStyles();
  const [imgBlob, setImgBlob] = React.useState<any>("");
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [crp, setCrp] = React.useState<Area>({} as Area);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = React.useState(null);
  const onCropComplete = React.useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCrp(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imgBlob, crp);
      setResult(croppedImage);
      setBlobImage(croppedImage);
      setCloseModal(false);
    } catch (e) {
      console.error(e);
    }
  }, [crp, imgBlob, setCloseModal, setBlobImage, setResult]);

  React.useEffect(() => {
    const blob = URL?.createObjectURL(image);
    const file = image;
    setProfileImageName(file.name)
    setImgBlob(blob);
  }, [image]);

  return (
    <>
      <div className={classes.app}>
        <div className={classes.cropContainer}>
          <Cropper
            showGrid={false}
            image={imgBlob}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2} lg={2}>
              <MuiIcons color="secondary" fontSize="small" icon="image" />
            </Grid>
            <Grid item xs={8} lg={8}>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(Number(zoom))}
                classes={{ root: classes.slider }}
              />
            </Grid>
            <Grid item xs={1} lg={1}>
              <MuiIcons color="secondary" fontSize="large" icon="image" />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.footerWrapper}>
        <div className={classes.footer}>
          <div className={classes.buttonsBody}>
            <Button
              className={classes.buttonSave}
              onClick={showCroppedImage}
              text="Save"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
