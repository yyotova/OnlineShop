import {
  SET_PRODUCTS,
  SELECTED_PRODUCT,
  SelectedProductRequest,
  SetProductsRequest,
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

export { setProducts, selectedProduct };
