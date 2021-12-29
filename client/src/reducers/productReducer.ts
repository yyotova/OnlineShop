import {
  ProductActionTypes,
  SELECTED_PRODUCT,
  SET_PRODUCTS,
} from "../constants/action-types";
import { ProductType } from "../models/product-model";

type ProductsState = {
  products: ProductType[];
};

const productsInitialState: ProductsState = {
  products: [],
};

type SelectedProductState = {
  product: ProductType;
};

const selectedProductInitialState: SelectedProductState = {
  product: {
    _id: "",
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: [],
    itemsInStock: 0,
    size: [],
  },
};

export const productReducer = (
  state = productsInitialState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (
  state = selectedProductInitialState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case SELECTED_PRODUCT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
