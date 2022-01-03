import { 
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAILURE, 
  USER_REGISTER_CLEANUP, 
  UserActionTypes,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE
} from "../constants/action-types";
import { RegisterAndUpdateActions, LoginActions, UserListActions } from "../models/user-types";

const userState: UserListActions = { loading: true, userInfo: [], error: '' };

export const usersListReducer = (state = userState, action: UserActionTypes): UserListActions => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { 
        loading: true, 
        userInfo: [] 
      };
    case USER_LIST_SUCCESS:
      return { 
        loading: false, 
        userInfo: action.payload 
      };
    case USER_LIST_FAILURE:
      return { 
        loading: false, 
        userInfo: [], 
        error: action.payload 
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = userState, action: UserActionTypes) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { 
        loading: true 
      };
    case USER_DELETE_SUCCESS:
      return { 
        loading: false, 
        userInfo: action.payload, 
        success: true 
      };
    case USER_DELETE_FAILURE:
      return { 
        loading: false, 
        userInfo: [], 
        error: action.payload 
      };
    default:
      return state;
  }
};

const initialRegisterState: RegisterAndUpdateActions = {loading: false};

export const userRegisterReducer = (state=initialRegisterState, action: UserActionTypes ): RegisterAndUpdateActions => {
  switch(action.type){
    case USER_REGISTER_REQUEST:
      return { 
        loading: true
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true, 
        userInfo: action.payload
      };
    case USER_REGISTER_FAILURE:
      return {
        loading: false, 
        error: action.payload
      }
    case USER_REGISTER_CLEANUP:
      return {
        loading: false, 
        userInfo: undefined
      }
    default:
      return state;
  }
};

const initialLogInState: LoginActions = { isLoggedIn: false };

export const userLoginReducer = (state=initialLogInState, action: UserActionTypes ): LoginActions => {
  switch(action.type){
    case USER_LOGIN_REQUEST:
      return { 
        isLoggedIn: false
      };
    case USER_LOGIN_SUCCESS:
      return {isLoggedIn: true, userInfo: action.payload};
    case USER_LOGIN_FAILURE:
      return {
        isLoggedIn: false, 
        error: action.payload
      };
      case USER_LOGOUT_REQUEST:
        return { 
          isLoggedIn: false, 
          userInfo: undefined, 
          error: undefined
        };
      case USER_LOGOUT_SUCCESS:
        return { 
          isLoggedIn: false, 
          userInfo: undefined, 
          error: undefined
        };
    default:
      return state;
  }
};