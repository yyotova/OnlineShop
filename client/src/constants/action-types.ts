import { ProductType } from "../models/product-model";

export const LIST_PRODUCTS = "LIST_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";

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

export type AppActions = ProductActionTypes;
