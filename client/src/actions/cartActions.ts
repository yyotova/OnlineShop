import {
  SetUserCartRequest,
  SET_USER_CART,
  UpdateUserCartRequest,
  UPDATE_CART,
} from "../constants/action-types";
import { CartType } from "../models/cart-model";

const setUserCart = (cart: CartType): SetUserCartRequest => {
  return {
    type: SET_USER_CART,
    payload: cart,
  };
};

const editUserCart = (cart: CartType): UpdateUserCartRequest => {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
};

export { setUserCart, editUserCart };
