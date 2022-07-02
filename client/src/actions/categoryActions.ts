import { Dispatch } from "redux";
import {
  AppActions,
  DeleteCategoryRequest,
  DELETE_CATEGORY,
  SaveCategoryRequest,
  SAVE_CATEGORY,
  SetCategoriesRequest,
  SET_CATEGORIES,
  UpdateCategoryRequest,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/action-types";
import { CategoryType } from "../models/category-model";
import { getStateType } from "../models/shared-types";
import axios from "axios";

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

const removeCategory = (categoryId: string): DeleteCategoryRequest => {
  return {
    type: DELETE_CATEGORY,
    payload: categoryId,
  };
};

export const updateCategory =
  (category: CategoryType) =>
  async (dispatch: Dispatch<AppActions>, getState: getStateType) => {
    try {
      dispatch({ type: UPDATE_CATEGORY, payload: category });
      const {
        userLogin: { userInfo },
      } = getState();
      if (userInfo) {
        const {
          data: { data: newCategory },
        } = await axios.put(
          `http://localhost:3030/api/categories/${category._id}`,
          category,
          {
            headers: {
              "x-auth": userInfo.token || "",
            },
          }
        );
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: newCategory });
      }
    } catch (err: any) {
      console.log("action " + err);
      dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: err.errorMessage });
    }
  };

export { setCategories, addCategory, removeCategory };
