import { User } from "./User";

type Link = {
    name: string
    link: string
}

export interface ProfileSettingsResponse {
    message: string;
    updatedUser: User
    statusCode?: number | undefined
}
export interface AccountSettingsResponse {
    message: string;
    updatedUser: User
    statusCode?: number | undefined
}
export interface SecuritySettingsResponse {
    message: string;
    updatedUser: User
    statusCode?: number | undefined
}

export type ProfileSettings = {
    image: string;
    company_name: string;
    first_name: string;
    last_name: string;
    username: string;
    about: string;
    skills: string[];
    social_links: Link[];
};

export type AccountSettings = {
    industry: any;
    profession?: string;
    date_of_birth: any;
    country: string;
    state: string;
    city: string;
    address: string;
    company_size?: string;
    company_email?: string;
    company_type?: any;
    year_of_incorporation?: any;
};

export type SecutirySettings = {
    email?: string;
    password?: string;
    phone_number?: string;
};

export type UserDetails = {
    image: string;
    company_name?: string;
    company_type?: string;
    first_name?: string;
    last_name?: string;
    username: string;
    about: string;
    date_of_birth: string;
    country: string;
    state: string;
    city: string;
    address: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    phone_number: any;
};

export type JobDetails = {
    company_size: string;
    company_email?: string;
    year_of_incorporation?: string | number;
    industry: any;
    profession?: string;
    skills: string[];
    companyType?: any
};
type Email = {
    email: string;
    account_type: 'Individual' | "Institution";

};

export type Conatct = {
    name: string;
    link: string;
};

export type CardDetails = {
    image: string;
    fullname: string;
    title: string;
    about: string;
    background: string;
    contactInformation: Conatct[];
};

export interface CreateProfile extends JobDetails, UserDetails, Email { }

export interface CheckUsername {
    username: string;
}
export interface CheckPassword {
    password: string;
}
export interface CheckOtp {
    code: string;
}
export interface CheckEmailChangeOtp {
    otp: string;
}
export interface CheckPasswordResponse {
    statusCode?: number;
    message: string;
    error?: string;
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
    verified?: boolean
}

