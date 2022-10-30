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

const AddMarkerModal = ({ onClose, fetchMarkers, token }) => {
  const [dataToUpload, setDataToUpload] = useState({
    targetImage: null,
    compiledImage: null,
  });
  console.log(token);
  const [progress, setProgress] = useState(0);
  const [dataUri, setDataUri] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const compiler = new MINDAR.IMAGE.Compiler();

      const showData = (data) => {
        setDataToUpload({
          ...dataToUpload,
          targetImage: acceptedFiles[0],
        });
      };

      const generateBlob = (buffer) => {
        var blob = new Blob([buffer]);
        return blob;
      };

      const compileFiles = async (files) => {
        const images = [];
        for (let i = 0; i < files.length; i++) {
          images.push(await loadImage(files[i]));
        }
        const dataList = await compiler.compileImageTargets(
          images,
          (progress) => {
            setProgress(progress.toFixed(2));
          }
        );
        for (let i = 0; i < dataList.length; i++) {
          showData(dataList[i]);
        }

        const exportedBuffer = await compiler.exportData();
        setDataToUpload({
          ...dataToUpload,
          targetImage: acceptedFiles[0],
          compiledImage: generateBlob(exportedBuffer),
        });
        fileToDataUri(generateBlob(acceptedFiles[0])).then((dataUri) => {
          setDataUri(dataUri);
        });
      };

      const start = () => {
        if (acceptedFiles.length === 0) return;
        const ext = acceptedFiles[0].name.split(".").pop();
        if (ext === "mind") {
          loadMindFile(acceptedFiles[0]);
        } else {
          compileFiles(acceptedFiles);
        }
      };

      if (acceptedFiles.length > 0) {
        start();
      }
    },

    [dataToUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png,image/jpg",
    maxFiles: 1,
    onDropRejected: (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        toast.error(`Upload Limit is (1) file`);
      }
    },
  });

  const loadImage = async (file) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadImageAndTarget = async () => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    setLoading(true);
    const formData = new FormData();
    formData.append("markerImage", dataToUpload.targetImage);
    formData.append("markerFile", dataToUpload.compiledImage);
    let res;
    if (token === undefined) {
      res = await axios.post(`${API_URL}/card/marker`, formData, config);
    } else {
      res = await axios.post(
        `${API_URL}/card/mobile-marker-upload?userId=${token}`,
        formData,
        config
      );
    }
    if (res.status === 201) {
      setLoading(false);
      toast.success("Marker uploaded Sucessfully");
      if (token === undefined) {
        fetchMarkers();
        onClose();
      } else {
        onClose();
      }
    }
  };
  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

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
            border: `2px solid "gray"`,
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
          {dataToUpload.targetImage ? (
            // <img src={} alt="" />
            <div className="flex flex-col items-center justify-center h-[100%]">
              <img style={{ height: "15rem" }} src={dataUri} alt="" />
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
                    Please Upload Your marker image by clicking here or dropping
                    it here
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
        {dataToUpload.targetImage !== null ? (
          <Button
            loading={loading}
            text="Upload"
            type="grey"
            onClick={() => uploadImageAndTarget()}
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

export default AddMarkerModal;
