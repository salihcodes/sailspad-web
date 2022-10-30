import { useMutation, useQuery } from "react-query";

import { AuthResponse, CheckEmailResponse } from "../Interfaces/Login";
import { API_URL, getRefreshToken, getAccessToken } from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}
interface CheckEmail {
  email: string;
}

export const useLoginUser = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>(
    "login-user",
    async (variables: LoginCredentials) => {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error("Email or password not correct.");
      }
      return response.json();
    }
  );
};

export const useCheckEmail = () => {
  return useMutation<CheckEmailResponse, Error, CheckEmail>(
    "check-if-email-exist",
    async (variables: CheckEmail) => {
      const response = await fetch(`${API_URL}/auth/check-email`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error("Email Exist.");
      }
      return response.json();
    }
  );
};

export const useRefreshToken = () => {
  return useQuery<AuthResponse, Error>(
    "refresh-token",
    async () => {
      const response = await fetch(`${API_URL}/auth/refresh-access-token/`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ refresh_token: getRefreshToken() }),
      });
      if (!response.ok) {
        throw new Error("TOKEN_EXPIRED");
      }
      return response.json();
    },
    {
      staleTime: 59 * 60 * 1000,
      enabled: Boolean(getRefreshToken()),
      refetchInterval: 59 * 60 * 1000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const getUserData = () => {
  return useQuery<AuthResponse, Error>("get-user-data", async () => {
    const response = await fetch(`${API_URL}/user/`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        Authorization: getAccessToken(),
      },
    });
    if (!response.ok) {
      throw new Error("TOKEN_EXPIRED");
    }
    return response.json();
  });
};
