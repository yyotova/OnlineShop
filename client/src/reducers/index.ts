import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { userRegisterReducer, userLoginReducer, usersListReducer, userDeleteReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  allCategories: categoryReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userList: usersListReducer,
  userDelete: userDeleteReducer
});

export default reducers;
