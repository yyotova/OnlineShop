import { ProductType } from "../models/product-model";
import { RegisterUserRequest, UserType, LogInUserRequest } from "../models/user-types";

export const LIST_PRODUCTS = "LIST_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";
export const USER_REGISTER_CLEANUP = "USER_REGISTER_CLEANUP";
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export interface UserRegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
  payload: RegisterUserRequest;
}

export interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: UserType;
}

export interface UserRegisterFailure {
  type: typeof USER_REGISTER_FAILURE;
  payload: string;
}

export interface UserRegisterCleanup {
  type: typeof USER_REGISTER_CLEANUP;
  payload: undefined;
}

export interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
  payload: LogInUserRequest;
}

export interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: UserType;
}

export interface UserLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
  payload: string;
}

export interface UserLogoutRequest {
  type: typeof USER_LOGOUT_REQUEST;
}

export interface UserLogoutSuccess {
  type: typeof USER_LOGOUT_SUCCESS;
  payload: undefined;
}

export interface SetProductsRequest {
  type: typeof SET_PRODUCTS;
  payload: ProductType[];
}

export interface SelectedProductRequest {
  type: typeof SELECTED_PRODUCT;
  payload: ProductType;
}

export interface RemoveSelectedProductRequest {
  type: typeof REMOVE_SELECTED_PRODUCT;
  payload: ProductType;
}

export type ProductActionTypes =
  | SetProductsRequest
  | SelectedProductRequest
  | RemoveSelectedProductRequest;

export type UserActionTypes =
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFailure
  | UserRegisterCleanup
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFailure
  | UserLogoutRequest
  | UserLogoutSuccess;

export type AppActions = ProductActionTypes | UserActionTypes;
