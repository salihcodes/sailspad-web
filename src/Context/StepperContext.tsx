import * as React from "react";

import { UserDetails, CreditCardDetail } from "Interfaces/SignUp";
import { useHistory } from "react-router-dom";

interface IStepperContext {
  modalOpen: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subModalOpen: boolean;
  setSubModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  creditCardDetail: CreditCardDetail;
  setCreditCardDetail: React.Dispatch<React.SetStateAction<CreditCardDetail>>;
  signUpUsertoken: string;
  setSignUpUserToken: (token: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleFinish: () => void;
  handleSubcriptionModal: () => void;
  clientSecret: string;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
  yearlySubcription: boolean;
  setYearlySubcription: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialuserDetails: UserDetails = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phoneNumber: "",
  cardAmount: 9,
  totalAmount: 20,
  subscriptionType: "Personal",
  subscriptionPricePerCard: 2,
};

const initialcreditCardDetail: CreditCardDetail = {
  number: "",
  expiry: "",
  cvc: "",
  name: "",
  country: "",
};

export const StepperContext = React.createContext<IStepperContext>(
  {} as IStepperContext
);

export const StepperProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [modalOpen, setModelOpen] = React.useState<boolean>(false);
  const [subModalOpen, setSubModalOpen] = React.useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [selectedType, setSelectedType] = React.useState<string>("");
  const [userDetails, setUserDetails] =
    React.useState<UserDetails>(initialuserDetails);
  const [creditCardDetail, setCreditCardDetail] =
    React.useState<CreditCardDetail>(initialcreditCardDetail);
  const [signUpUsertoken, setSignUpUserToken] = React.useState<string>("");
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [yearlySubcription, setYearlySubcription] =
    React.useState<boolean>(false);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    setActiveStep(0);
    // history.push("/");
    setModelOpen(false);
    setUserDetails(initialuserDetails);
  };

  const handleSubcriptionModal = () => {
    setSubModalOpen(true);
  };

  return (
    <StepperContext.Provider
      value={{
        modalOpen,
        setModelOpen,
        subModalOpen,
        setSubModalOpen,
        drawerOpen,
        setDrawerOpen,
        activeStep,
        setActiveStep,
        selectedType,
        setSelectedType,
        userDetails,
        setUserDetails,
        creditCardDetail,
        setCreditCardDetail,
        signUpUsertoken,
        clientSecret,
        setClientSecret,
        yearlySubcription,
        setYearlySubcription,
        setSignUpUserToken,
        handleNext,
        handleBack,
        handleFinish,
        handleSubcriptionModal,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
