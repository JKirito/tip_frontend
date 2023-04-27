export interface User {}
export interface BaseUser {
  user: User;
}

export interface JobPostData {
  title: string;
  subject: string;
  location: string;
  description: string;
}
export interface ErrorMessage {
  msg: string;
  code: number;
}

export interface TokenData {
  token: string;
}
