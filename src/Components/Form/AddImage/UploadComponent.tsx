import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import { ImageUploadIcon } from "Components/Icons/ImageUploadIcon";
import Button from "Components/Button";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify"

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly close: () => void;
  readonly handleSetImage: (file: any) => void;
  //dont know the type of file
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "50px 0px",
    },
    uploadDiv: {
      background: theme.palette.gray[100],
      border: `2px solid ${theme.palette.gray[600]}`,
      boxSizing: "border-box",
      boxShadow: "0px 138px 189px -76px rgba(0, 0, 0, 0.06)",
      borderRadius: "10px",
      maxWidth: "615px",
      width: "100%",
      margin: "auto",
      textAlign: "center",
      padding: "50px 0px",
      marginTop: "10px",
      marginBottom: "10px",
    },
    heading: {
      fontWeight: "bold",
      fontSize: "12px",
      lineHeight: "18px",
      color: theme.palette.gray[500],
    },
    detail: {
      fontSize: "12px",
      lineHeight: "18px",
      color: theme.palette.secondary.dark,
    },
    redText: {
      color: theme.palette.primary.main,
    },
    helperText: {
      fontFamily: "'Poppins'",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "19px",
      display: "flex",
      textAlign: "center",
      color: theme.palette.gray[400],
      justifyContent: "center",
      marginTop: "10px",
      textTransform: "capitalize"
    },
    actionContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "30px",
    },
  })
);

const ImageUploader: React.FC<Props> = ({ handleSetImage, close }) => {
  const classes = useStyles();
  const { getRootProps, acceptedFiles, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: 'image/jpeg,image/png,image/jpg',
    maxFiles: 1,
    maxSize: 1000000,
    multiple: false,
    onDropRejected: acceptedFiles => {
      if (acceptedFiles.length > 1) { toast.error(`Upload limit is Only (1)`) }
      else toast.error(`File size is more than 1MB`)
    }
  });

  // const formatBytes = (bytes: number, decimals = 2) => {
  //   if (bytes === 0) return "0 Bytes";

  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  //   const i = Math.floor(Math.log(bytes) / Math.log(k));

  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // };

  // const files = acceptedFiles.map((file , i) => {
  //   let formatFileSize = formatBytes(file.size);
  //   return (
  //     <li key={i}>
  //       {file.name} - {formatFileSize}
  //     </li>
  //   );
  // });

  React.useEffect(() => {
    if (acceptedFiles?.length > 0) {
      handleSetImage(acceptedFiles[0]);
    }
  });
  return (
    <div className={classes.root}>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className={classes.uploadDiv}>
            <ImageUploadIcon />
            <Typography className={classes.helperText} align="center">
              Please upload your personal image or Logo
            </Typography>
            <Typography className={classes.helperText} align="center">
              Maximum File Size : 1MB
            </Typography>
          </div>
          <div className={classes.actionContainer}>
            <Button onClick={open} type="grey" style={{ borderRadius: "20px", padding: "10px 20px", marginRight: "50px" }} text="Upload" />
            <Button onClick={close} type="grey" style={{ borderRadius: "20px", padding: "10px 20px" }} text="Cancel" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageUploader;
