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
  USER_LOGOUT_SUCCESS
} from "../constants/action-types";
import { RegisterAndUpdateActions, LoginActions } from "../models/user-types";

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