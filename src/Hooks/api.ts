// export const API_URL = "https://cors-anywhere.herokuapp.com/https://server.sailspad.com";
export const API_URL = import.meta.env.VITE_API_URL;
export const RETURN_URL = import.meta.env.VITE_RETURN_URL;

export const getAccessToken = (): string => {
  const token = localStorage.getItem("token");
  if (token) return ` Bearer ${token}`;
  return "";
};

export const getRefreshToken = (): string => {
  const token = localStorage.getItem("refresh_token");
  if (token) return token;
  return "";
};
