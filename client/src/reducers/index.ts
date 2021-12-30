import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userRegisterReducer, userLoginReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer
});

export default reducers;
