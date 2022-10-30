import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";

import ModalPopup from "Components/ModalPopup";
import Button from "Components/Button";
import useStyles from "./Style";

const DownloadQRModal = (props: any) => {
  const classes = useStyles();

  const handleDownloadQRCode = async () => {
    await html2canvas(document.querySelector("#react-qrcode-logo") as any).then(
      function (canvas) {
        const link = document.createElement("a");
        link.download = "sailspad-qr-code.png";
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  return (
    <ModalPopup
      {...props}
      maxWidth="xs"
      maxHeight="xs"
      modalTitle="Download QR Code"
      noFooter={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <QRCode
          style={{ width: "80%" }}
          value={`https://cards.sailspad.com/${props.shortName}`}
          quietZone={10}
          size={200}
          fgColor="#377B9E"
          bgColor="#fff"
          qrStyle="dots"
          eyeRadius={15}
          ecLevel="H"
          enableCORS={true}
          logoWidth={50}
          logoHeight={50}
          logoImage="https://res.cloudinary.com/salihudev/image/upload/v1660242370/qrlogo_rps5tt.svg"
          removeQrCodeBehindLogo={true}
        />
        <div
          style={{
            display: "flex",
            // width: "80%",
            margin: "0 auto",
            justifyContent: "space-between",
          }}
        >
          <Button
            className={classes.createButton}
            onClick={() => {
              handleDownloadQRCode();
              props.handleCloseModal();
            }}
            text="Download"
          />
          <div style={{ width: "10%" }}></div>
          <Button
            className={classes.createButton}
            onClick={() => {
              props.handleCloseModal();
            }}
            text="Close"
          />
        </div>
      </div>
    </ModalPopup>
  );
};

export default DownloadQRModal;
