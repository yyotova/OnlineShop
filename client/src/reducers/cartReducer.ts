import {
  CartActionTypes,
  SET_USER_CART,
  UPDATE_CART,
} from "../constants/action-types";
import { CartType } from "../models/cart-model";

type CartState = {
  cart: CartType;
};

const CartInitialState: CartState = {
  cart: { userId: "", items: [], _id: "" },
};

export const cartReducer = (
  state = CartInitialState,
  action: CartActionTypes
) => {
  switch (action.type) {
    case SET_USER_CART:
      return { ...state, cart: action.payload };
    case UPDATE_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
