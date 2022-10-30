import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import AddMarkerModal from "Components/Form/AddMarker/AddMarkerModal";
import Button from "Components/Button";
import MuiIcons from "Components/Icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      fontFamily: "Poppins",
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background:
        "linear-gradient(180deg, rgba(216,227,233,1) 51%, rgba(191,215,227,1) 100%)",
    },
    descriptionCard: {
      background: "rgba( 255, 255, 255, 0.25 )",
      //   boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      backdropFilter: "blur( 4px )",
      WebkitBackdropFilter: "blur( 4px )",
      borderRadius: "20px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: "1rem",
      paddingRight: "2rem",
      [theme.breakpoints.down("xs")]: {
        height: "50vh",
        width: "80vw",
        // transform: "scale(1.5)",
      },
    },
    title: {
      textAlign: "center",
      fontWeight: "normal",
    },
    uploadButton: {},
    instructions: {
      color: "#58696D",
      fontSize: "14px",
    },
    logoContainer: {
      marginTop: "-4rem",
    },
    footer: {
      position: "absolute",
      bottom: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "10%",
    },
  })
);

const MobileMarkerUpload = () => {
  const [openMarkerModal, setOpenMarkerModal] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const classes = useStyles();
  const params = useParams<any>();

  return (
    <div className={classes.wrapper}>
      <div className={classes.logoContainer}>
        <img
          src="https://res.cloudinary.com/salihudev/image/upload/v1655059739/Sailspad_1_lfgfw6.png"
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <div className={classes.descriptionCard}>
          <h2 className={classes.title}>
            Upload an image of your business card
          </h2>
          <ol className={classes.instructions}>
            <li>Make sure the card design has enough details</li>
            <li>
              Make sure the card image is not exceeding the edges of the card
            </li>
            <li>Make sure the card image is unobstructed and proportional</li>
          </ol>
          <Button
            type="grey"
            text="Upload"
            className={classes.uploadButton}
            onClick={() => setOpenMarkerModal(true)}
          />
        </div>
        <AddMarkerModal
          token={params?.accessToken}
          openModal={openMarkerModal}
          handleCloseModal={() => setOpenMarkerModal(false)}
          handleSaveChanges={function (): void {
            throw new Error("Function not implemented.");
          }}
          setOpenModal={setOpenModal}
          fetchMarkers={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className={classes.footer}>
        <img
          src="https://res.cloudinary.com/salihudev/image/upload/v1655059739/Sailspad_1_lfgfw6.png"
          style={{ width: "40%", marginBottom: "-2rem" }}
        />
        <p style={{ color: "#58696D" }}>All rights reserved 2022</p>
      </div>
    </div>
  );
};

export default MobileMarkerUpload;
