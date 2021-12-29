import {
  SET_PRODUCTS,
  SELECTED_PRODUCT,
  SelectedProductRequest,
  SetProductsRequest,
  REMOVE_SELECTED_PRODUCT,
  RemoveSelectedProductRequest,
} from "../constants/action-types";
import { ProductType } from "../models/product-model";

const setProducts = (products: ProductType[]): SetProductsRequest => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

const selectedProduct = (product: ProductType): SelectedProductRequest => {
  return {
    type: SELECTED_PRODUCT,
    payload: product,
  };
};

const removeSelectedProduct = (): RemoveSelectedProductRequest => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};

export { setProducts, selectedProduct, removeSelectedProduct };
