import {
  DeleteCategoryRequest,
  DELETE_CATEGORY,
  SaveCategoryRequest,
  SAVE_CATEGORY,
  SetCategoriesRequest,
  SET_CATEGORIES,
  UpdateCategoryRequest,
  UPDATE_CATEGORY,
} from "../constants/action-types";
import { CategoryType } from "../models/category-model";

const setCategories = (categories: CategoryType[]): SetCategoriesRequest => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

const addCategory = (category: CategoryType): SaveCategoryRequest => {
  return {
    type: SAVE_CATEGORY,
    payload: category,
  };
};

const editCategory = (category: CategoryType): UpdateCategoryRequest => {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
  };
};

const removeCategory = (categoryId: string): DeleteCategoryRequest => {
  return {
    type: DELETE_CATEGORY,
    payload: categoryId,
  };
};

export { setCategories, addCategory, editCategory, removeCategory };
