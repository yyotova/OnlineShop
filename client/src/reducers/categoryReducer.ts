import { CategoryActionTypes, SET_CATEGORIES } from "../constants/action-types";
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
    default:
      return state;
  }
};
