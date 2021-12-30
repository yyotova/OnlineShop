import {
  SET_PRODUCTS,
  SetProductsRequest,
  SAVE_PRODUCT,
  SaveProductRequest,
  UPDATE_PRODUCT,
  UpdateProductRequest,
} from "../constants/action-types";
import { ProductType } from "../models/product-model";

const setProducts = (products: ProductType[]): SetProductsRequest => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

const addProduct = (product: ProductType): SaveProductRequest => {
  return {
    type: SAVE_PRODUCT,
    payload: product,
  };
};

const editProduct = (product: ProductType): UpdateProductRequest => {
  return {
    type: UPDATE_PRODUCT,
    payload: product,
  };
};

export { setProducts, addProduct, editProduct };
