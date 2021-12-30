import { CategoryType } from "../models/category-model";
import { ProductType } from "../models/product-model";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const SET_CATEGORIES = "SET_CATEGORIES";

export interface SetCategoriesRequest {
  type: typeof SET_CATEGORIES;
  payload: CategoryType[];
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

export type ProductActionTypes =
  | SetProductsRequest
  | SaveProductRequest
  | UpdateProductRequest;

export type CategoryActionTypes = SetCategoriesRequest;

export type AppActions = ProductActionTypes | CategoryActionTypes;
