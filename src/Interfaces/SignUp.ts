type Link = {
  name: string;
  link: string;
};

export interface SignUpResponse {
  message: string;
  email: string;
  id: string;
  account_type: string;
  verified: boolean;
  access_token: string;
  refresh_token: string;
  status?: number | undefined;
}

export interface UserDetails {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  cardAmount: number;
  totalAmount: number;
  subscriptionType: string;
  subscriptionPricePerCard: number;
}
export interface CreditCardDetail {
  number: string | number;
  expiry: string;
  cvc: string | number;
  name: string;
  country: string;
}

export type Conatct = {
  name: string;
  link: string;
};

export interface CheckUsername {
  username: string;
}
export interface CheckOtp {
  code: string;
}
export interface CheckUsernameResponse {
  statusCode: number;
  message: string;
  error: string;
}
export interface CheckUsernameResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface CheckOtpResponse {
  statusCode?: number;
  message?: string;
  error?: string;
  verified?: boolean;
}
