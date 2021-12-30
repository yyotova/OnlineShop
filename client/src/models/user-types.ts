export interface RegisterAndUpdateType {
  loading: boolean;
  success: boolean;
  userInfo?: UserType;
  error?: string;
}

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LogInUserRequest {
  email: string;
  password: string;
}

export interface LoginActions {
  isLoggedIn: boolean;
  userInfo?: UserType;
  error?: string;
}

export interface RegisterAndUpdateActions {
  loading: boolean;
  success?: boolean;
  userInfo?: UserType;
  error?: string;
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
}