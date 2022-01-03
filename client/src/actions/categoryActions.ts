import {
  SetCategoriesRequest,
  SET_CATEGORIES,
} from "../constants/action-types";
import { CategoryType } from "../models/category-model";

const setCategories = (categories: CategoryType[]): SetCategoriesRequest => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

export { setCategories };
