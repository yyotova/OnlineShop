import {
  CategoryActionTypes,
  DELETE_CATEGORY,
  SAVE_CATEGORY,
  SET_CATEGORIES,
  UPDATE_CATEGORY,
} from "../constants/action-types";
import { CategoryType } from "../models/category-model";

type CategoriesState = {
  categories: CategoryType[];
};

const CategoriesInitialState: CategoriesState = {
  categories: [],
};

export const categoryReducer = (
  state = CategoriesInitialState,
  action: CategoryActionTypes
) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SAVE_CATEGORY:
      const newCategories = state.categories.concat(action.payload);
      return { ...state, categories: newCategories };
    case UPDATE_CATEGORY:
      const categories = state.categories.filter(
        (c) => c._id !== action.payload._id
      );
      return { ...state, categories: categories.concat(action.payload) };
    case DELETE_CATEGORY:
      const newItems = state.categories.filter((c) => c._id !== action.payload);
      return { ...state, categories: newItems };
    default:
      return state;
  }
};
