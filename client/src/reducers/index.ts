import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userRegisterReducer, userLoginReducer, usersListReducer, userDeleteReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userList: usersListReducer,
  userDelete: userDeleteReducer
});

export default reducers;
