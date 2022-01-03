import { CategoryType } from "../models/category-model";
import { ProductType } from "../models/product-model";
import {
  RegisterUserRequest,
  UserType,
  LogInUserRequest,
  UserActions
} from "../models/user-types";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const SET_CATEGORIES = "SET_CATEGORIES";

export const USER_REGISTER_CLEANUP = "USER_REGISTER_CLEANUP";
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILURE = "USER_LIST_FAILURE";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";

export interface UserListRequest {
  type: typeof USER_LIST_REQUEST;
}

export interface UserListSuccess {
  type: typeof USER_LIST_SUCCESS;
  payload: UserType[];
}

export interface UserListFailure {
  type: typeof USER_LIST_FAILURE;
  payload: string;
}

export interface UserDeleteRequest {
  type: typeof USER_DELETE_REQUEST;
  payload: string;
}

export interface UserDeleteSuccess {
  type: typeof USER_DELETE_SUCCESS;
  payload: UserActions;
}

export interface UserDeleteFailure {
  type: typeof USER_DELETE_FAILURE;
  payload: string;
}

export interface SetProductsRequest {
  type: typeof SET_PRODUCTS;
  payload: ProductType[];
}

export interface SaveProductRequest {
  type: typeof SAVE_PRODUCT;
  payload: ProductType;
}

export interface UpdateProductRequest {
  type: typeof UPDATE_PRODUCT;
  payload: ProductType;
}

export interface SetCategoriesRequest {
  type: typeof SET_CATEGORIES;
  payload: CategoryType[];
}

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

export type ProductActionTypes =
  | SetProductsRequest
  | SaveProductRequest
  | UpdateProductRequest;

export type CategoryActionTypes = SetCategoriesRequest;

export type UserActionTypes =
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFailure
  | UserRegisterCleanup
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFailure
  | UserLogoutRequest
  | UserLogoutSuccess
  | UserListRequest
  | UserListSuccess
  | UserListFailure
  | UserDeleteRequest
  | UserDeleteSuccess
  | UserDeleteFailure;

export type AppActions =
  | ProductActionTypes
  | CategoryActionTypes
  | UserActionTypes;
