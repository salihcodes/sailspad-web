import * as React from "react";
import ReactDOM from "react-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { Slide, ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "react-phone-number-input/style.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-credit-cards/es/styles-compiled.css";
import App from "./App";
import "./index.css";
import theme from "./theme";

const toastStyleOverride = { background: "#FBFBFB99", backdropFilter: "blur(6px)", borderRadius: "12px" }
// const stripePromise = "pk_test_51Ja1YvByeePakSrHMG27RpYh3j2REsW52DNrcoKAQupaZfIRapK0vSmLLSKAy6pKh9ZF9Cr0NACAIGYe9cax0UiT00ntHMmOgw"

// Stripe Publish Key
// const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`);
// const stripePromise = loadStripe("pk_test_51Ja1YvByeePakSrHMG27RpYh3j2REsW52DNrcoKAQupaZfIRapK0vSmLLSKAy6pKh9ZF9Cr0NACAIGYe9cax0UiT00ntHMmOgw");

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ToastContainer toastStyle={toastStyleOverride} position="top-right" autoClose={5000} transition={Slide} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        {/* <Elements stripe={stripePromise}> */}
        <App />
        {/* </Elements> */}
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

