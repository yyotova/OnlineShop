import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { userRegisterReducer, userLoginReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  allCategories: categoryReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userCart: cartReducer,
});

export default reducers;
