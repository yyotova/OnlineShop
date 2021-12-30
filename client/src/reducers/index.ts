import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  allCategories: categoryReducer,
});

export default reducers;
