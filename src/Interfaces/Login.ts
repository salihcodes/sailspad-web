/* eslint-disable @typescript-eslint/no-explicit-any */
import { number } from "yup";
import { User } from "./User";
export interface AuthResponse {
  readonly accessToken: string;
  readonly subscriptionStatus: string;
  readonly role: string[];
  readonly signupStep: number;
}
export interface CheckEmailResponse {
  readonly isEmailAvailable: boolean;
}
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}
export interface SocialAuthResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly id: string;
  readonly new_user: boolean;
}

export interface SocialCredential {
  email: string | any;
  first_name: string | any;
  last_name: string | any;
  profile_image: string | any;
  account_type?: string | any;
  social_account: string | any;
}
