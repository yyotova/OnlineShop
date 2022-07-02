import {
  CategoryActionTypes,
  DELETE_CATEGORY,
  SAVE_CATEGORY,
  SET_CATEGORIES,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/action-types";
import { CategoryType } from "../models/category-model";
import { CategoryActions } from "../models/category-types";

type CategoriesState = {
  categories: CategoryType[];
};

const CategoriesInitialState: CategoriesState = {
  categories: [],
};

export const categoryReducer = (
  state = CategoriesInitialState,
  action: CategoryActionTypes
): CategoryActions => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SAVE_CATEGORY:
      const newCategories = state.categories.concat(action.payload);
      return { ...state, categories: newCategories };
    case UPDATE_CATEGORY_SUCCESS:
      const categories = state.categories.filter(
        (c) => c._id !== action.payload._id
      );
      return { ...state, categories: categories.concat(action.payload) };
    case UPDATE_CATEGORY_FAILURE:
      return { categories: state.categories, error: action.payload };
    case DELETE_CATEGORY:
      const newItems = state.categories.filter((c) => c._id !== action.payload);
      return { ...state, categories: newItems };
    default:
      return state;
  }
};
