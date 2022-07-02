import {
  LIST_SECTIONS_FAILURE,
  LIST_SECTIONS_REQUEST,
  LIST_SECTIONS_SUCCESS,
  SectionActionTypes,
} from "../constants/action-types";
import { SectionType } from "../models/section-model";
import { SectionActions } from "../models/section-types";

type SectionsState = {
  sections: SectionType[];
};

const SectionsInitialState: SectionsState = {
  sections: [],
};

export const sectionReducer = (
  state = SectionsInitialState,
  action: SectionActionTypes
): SectionActions => {
  switch (action.type) {
    case LIST_SECTIONS_SUCCESS:
      return { ...state, sections: action.payload };
    case LIST_SECTIONS_FAILURE:
      return { sections: state.sections, error: action.payload };
    case LIST_SECTIONS_REQUEST:
      return { sections: [] };
    default:
      return state;
  }
};
