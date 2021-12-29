import { ProductActionTypes, SET_PRODUCTS } from "../constants/action-types";

const initialState = {
  products: [],
};

export const productReducer = (
  state = initialState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
