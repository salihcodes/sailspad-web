type Link = {
  name: string;
  link: string;
  _id?: string;
};

export type User = {
  _id: string;
  email: string;
  account_type: string;
  roles: string[];
  skills: string[];
  sign_up_step: number;
  verified: boolean;
  card_slots: number;
  plan: string;
  cards: string[];
  posts: string[];
  login_attempts: number;
  contact_information: [];
  social_links: Link[];
  verification_expires: string;
  block_expires: string;
  createdAt: string;
  updatedAt: string;
  about: string;
  city: string;
  company_email: string;
  company_name: string;
  company_size: string;
  company_type: string;
  country: string;
  date_of_birth: string;
  first_name: string;
  industry: string;
  last_name: string;
  phone_number: string;
  profession: string;
  address: string;
  state: string;
  username: string;
  year_of_incorporation: string;
  otp: number;
  subscriptionStatus: string;
};
// export interface User {
//   readonly firstName?: string;
//   readonly lastName?: string;
//   readonly email?: string;
//   readonly id?: string;
//   readonly accessToken?: string;
// }
export interface Card {
  profilePic: string;
  name: string;
  description: string;
  live: boolean;
  business?: boolean;
  username?: string;
}
export interface Company {
  profilePic: string;
  name: string;
  description: string;
  live: boolean;
  business?: boolean;
  cards?: Card[];
}

export interface ChatRowProps {
  avatar?: string;
  name?: string;
  date?: string;
  isOnline?: boolean;
  unreadMessageCount?: number;
  lastMessage: string;
  onClick?: () => void;
}
