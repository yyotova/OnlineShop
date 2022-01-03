import {
  DELETE_PRODUCT,
  ProductActionTypes,
  SAVE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../constants/action-types";
import { ProductType } from "../models/product-model";

type ProductsState = {
  products: ProductType[];
};

const productsInitialState: ProductsState = {
  products: [],
};

export const productReducer = (
  state = productsInitialState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SAVE_PRODUCT:
      const items = state.products.concat(action.payload);
      return { ...state, products: items };
    case UPDATE_PRODUCT:
      const products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      return { ...state, products: products.concat(action.payload) };
    case DELETE_PRODUCT:
      const newItems = state.products.filter((p) => p._id !== action.payload);
      return { ...state, products: newItems };
    default:
      return state;
  }
};
