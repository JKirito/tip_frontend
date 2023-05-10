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

export interface JobsFetchData {
  title: string;
  subject: string;
  location: string;
  description: string;
  user_id: string;
  username: string;
}
