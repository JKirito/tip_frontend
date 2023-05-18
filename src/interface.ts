export interface User {}
export interface BaseUser {
  user: User;
}

export interface JobPostData {
  title: string;
  subject: string;
  location: string;
  description: string;
  jobType: JobType;
}
export interface ErrorMessage {
  msg: string;
  code: number;
}

export interface TokenData {
  token: string;
  role: Roles;
}

export interface JobsFetchData {
  title: string;
  subject: string;
  location: string;
  description: string;
  user_id: string;
  username: string;
  jobType: JobType;
}

export enum Roles {
  ADMIN = 'admin',
  BASIC = 'basic',
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  VOLUNTEER = 'volunteer',
  OTHER = 'other',
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  city: string;
  state: string;
  postcode: string;
  education: string;
  preferences: string;
  skills: string;
  coverLetter: string;
  email: string;
  resume: string;
}
