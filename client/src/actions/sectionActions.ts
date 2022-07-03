import axios from "axios";
import { Dispatch } from "redux";
import {
  AppActions,
  LIST_SECTIONS_FAILURE,
  LIST_SECTIONS_REQUEST,
  LIST_SECTIONS_SUCCESS,
} from "../constants/action-types";
import { SectionType } from "../models/section-model";
import { getStateType } from "../models/shared-types";

export const listSections =
  () => async (dispatch: Dispatch<AppActions>, getState: getStateType) => {
    try {
      dispatch({ type: LIST_SECTIONS_REQUEST, payload: [] });

      const { data } = await axios.get("http://localhost:3030/api/sections");

      dispatch({
        type: LIST_SECTIONS_SUCCESS,
        payload: data as SectionType[],
      });
    } catch (err: any) {
      dispatch({ type: LIST_SECTIONS_FAILURE, payload: err.message });
    }
  };
