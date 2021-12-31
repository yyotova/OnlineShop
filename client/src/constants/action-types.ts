import { CartType } from "../models/cart-model";
import { CategoryType } from "../models/category-model";
import { ProductType } from "../models/product-model";
import { IdType } from "../models/shared-types";
import {
  RegisterUserRequest,
  UserType,
  LogInUserRequest,
} from "../models/user-types";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SAVE_CATEGORY = "SAVE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const SET_USER_CART = "SET_USER_CART";
export const SAVE_CART = "SAVE_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";

export const USER_REGISTER_CLEANUP = "USER_REGISTER_CLEANUP";
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

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

export interface DeleteProductRequest {
  type: typeof DELETE_PRODUCT;
  payload: string;
}

export interface SetCategoriesRequest {
  type: typeof SET_CATEGORIES;
  payload: CategoryType[];
}

export interface SaveCategoryRequest {
  type: typeof SAVE_CATEGORY;
  payload: CategoryType;
}

export interface UpdateCategoryRequest {
  type: typeof UPDATE_CATEGORY;
  payload: CategoryType;
}

export interface DeleteCategoryRequest {
  type: typeof DELETE_CATEGORY;
  payload: string;
}

export interface SetUserCartRequest {
  type: typeof SET_USER_CART;
  payload: CartType;
}

export interface UpdateUserCartRequest {
  type: typeof UPDATE_CART;
  payload: CartType;
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
  payload: IdType;
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
  | UpdateProductRequest
  | DeleteProductRequest;

export type CategoryActionTypes =
  | SetCategoriesRequest
  | SaveCategoryRequest
  | UpdateCategoryRequest
  | DeleteCategoryRequest;

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

export type CartActionTypes = SetUserCartRequest | UpdateUserCartRequest;

export type AppActions =
  | ProductActionTypes
  | CategoryActionTypes
  | UserActionTypes
  | CartActionTypes;
