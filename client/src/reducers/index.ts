import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { userRegisterReducer, userLoginReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  allCategories: categoryReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});

export default reducers;
