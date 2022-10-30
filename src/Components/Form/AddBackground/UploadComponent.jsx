/* eslint-disable no-undef */
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Button from "Components/Button";
import { ImageUploadIcon } from "Components/Icons/ImageUploadIcon";
import { Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { toast } from "react-toastify";
import { getAccessToken, API_URL } from "Hooks/api";
import "mind-ar/dist/mindar-image.prod.js";

const UploadComponent = ({ onClose, setImageResult, setImagePreview }) => {
  const [dataToUpload, setDataToUpload] = useState({
    targetImage: null,
    compiledImage: null,
  });
  const [progress, setProgress] = useState(0);
  const [dataUri, setDataUri] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // const getBase64 = async (file) => {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   return new Promise((reslove, reject) => {
  //     reader.onload = () => reslove(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   })
  // }

  const convertBase64 = (file) => {
    var promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then(
      (result) => {
        setDataUri(result);
      },
      function (error) {
        console.log({ previewImage: error });
      }
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    setPreviewImage(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );

    if (acceptedFiles.length > 0) {
      convertBase64(acceptedFiles[0]);
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: 'image/jpeg,image/png,image/jpg',
      maxFiles: 1,
      maxSize: 2000000,
      multiple: false,
      onDropRejected: (acceptedFiles) => {
        if (acceptedFiles) {
          toast.error(`Upload Limit Exceeds try smaller file`);
        }
      },
    });

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const files = acceptedFiles.map((file) => {
    let formatFileSize = formatBytes(file.size);
    return (
      <li key={file.path}>
        {file.path} - {formatFileSize}
      </li>
    );
  });

  const handleUpload = () => {
    if (previewImage) setImagePreview(previewImage[0]?.preview);
    setImageResult(dataUri);
    onClose();
  };

  const between = (x, min, max) => {
    return x >= min && x <= max;
  };

  return (
    <>
      {between(progress, 1, 99) && (
        <div>
          <LinearProgress value={progress} />
        </div>
      )}

      <div {...getRootProps()} className="h-[100%]">
        <input {...getInputProps()} />
        <div
          style={{
            background: "#F5F5F5",
            // border: `2px solid gray`,
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
          }}
        >
          {previewImage[0] ? (
            // <img src={} alt="" />
            <div className="flex flex-col items-center justify-center h-[100%]">
              <img
                style={{ height: "100%", width: "80%" }}
                src={previewImage[0].preview}
                alt=""
              />
              <Typography align="center">{files}</Typography>
              {/* <p>{dataToUpload.targetImage.name}</p> */}
            </div>
          ) : (
            <div style={{ cursor: "pointer" }}>
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <ImageUploadIcon />
                  <Typography align="center">
                    Upload Your Background By clicking here or dropping it
                    here.
                  </Typography>
                  <br />
                  <Typography align="center">
                    Maximum File Size : 1MB
                  </Typography>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {previewImage[0] !== undefined ? (
          <Button
            loading={loading}
            text="Upload"
            type="grey"
            onClick={handleUpload}
            className="bg-gray-100 text-black border-2 rounded-full w-[40%]"
          >
            Upload
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          onClick={onClose}
          type="grey"
          text="Cancel"
          style={{
            borderRadius: "20px",
            padding: "10px 20px",
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default UploadComponent;
