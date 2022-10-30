import { useMutation, useQuery } from "react-query";

import { API_URL, getRefreshToken, getAccessToken } from "./api";

interface SignUpVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword?: string;
  dateOfBirth: string;
  subscriptionType: string;
  totalAmount?: number;
  cardAmount?: number;
}

interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  stripeCustomerId: string;
  email: string;
  statusCode?: number;
  message?: string;
  error?: string;
}

export interface CheckOtp {
  otp: string;
}
export interface ResendOtp {
  token: string;
}

export interface CheckOtpResponse {
  statusCode?: number;
  message?: string;
  error?: string;
  isEmailVerified?: boolean;
}

export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpVariables>(
    "signup-user",
    async (variables: SignUpVariables) => {
      // delete variables
      delete variables.confirmPassword;
      delete variables.totalAmount;
      delete variables.cardAmount;

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(variables),
      });
      // if (!response.ok) {
      //   throw new Error("Error in Signup.");
      // }
      return response.json();
    }
  );
};

export const useVerifyEmail = () => {
  return useMutation<CheckOtpResponse, Error, CheckOtp>(
    "check-otp",
    async (variables: CheckOtp) => {
      const response = await fetch(
        `${API_URL}/auth/validate-email?token=${variables.otp}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          // body: JSON.stringify(variables)
        }
      );

      if (!response.ok) throw new Error("Code was not valid");

      return response.json();
    }
  );
};

export const useResendCode = () => {
  return useMutation<any, Error, ResendOtp>(
    "resend-otp",
    async (variables: ResendOtp) => {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          // "Content-type": "application/json",
          Authorization: "Bearer " + variables.token,
        },
        // body: JSON.stringify(variables)
      });

      if (!response.ok) throw new Error("Code was not valid");

      return response.json();
    }
  );
};
