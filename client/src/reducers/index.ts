import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import {
  userRegisterReducer,
  userLoginReducer,
  usersListReducer,
  userDeleteReducer,
} from "./userReducer";
import {
  orderCreateReducer,
  orderUpdateReducer,
  orderDeleteReducer,
  orderListReducer,
} from "./orderReducer";
import { messageReducer } from "./messageReducer";
import { sectionReducer } from "./sectionReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  allCategories: categoryReducer,
  allSections: sectionReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userCart: cartReducer,
  userList: usersListReducer,
  userDelete: userDeleteReducer,
  createOrder: orderCreateReducer,
  updateOrder: orderUpdateReducer,
  deleteOder: orderDeleteReducer,
  listOrders: orderListReducer,
  messageList: messageReducer,
});

export default reducers;
