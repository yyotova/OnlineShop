import { Dispatch } from 'redux';
import axios from 'axios';

import {
  USER_REGISTER_CLEANUP,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  AppActions,
  USER_LOGOUT_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE
} from '../constants/action-types';
import { getStateType } from '../models/shared-types';
import { UserType } from '../models/user-types';

export const listUsers = () => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await axios.get('http://localhost:3030/users/');
      const result = data.filter((user: any) => {
        return user.isAdmin === false;
      }) as UserType[];
      dispatch({ type: USER_LIST_SUCCESS, payload: result });
    }
  } catch (err: any) {
    dispatch({ type: USER_LIST_FAILURE, payload: err.message });
  }
};

export const deleteUser = (userId: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
      userLogin: { userInfo },
    } = getState();
    if (userInfo) {
      const {
        data: { data: newOrder },
      } = await axios.delete(`http://localhost:3030/users/delete/${userId}`);
      dispatch({ type: USER_DELETE_SUCCESS, payload: newOrder });
    }
  } catch (err: any) {
    dispatch({ type: USER_DELETE_FAILURE, payload: err.message });
  }
};

export const loginAction = (email: string, password: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  if (!email && !password) {
    dispatch({ type: USER_LOGOUT_REQUEST, payload: undefined });
    return;
  }
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('http://localhost:3030/auth/login', { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: USER_LOGIN_FAILURE, payload: err.message });
  }
};

export const registerUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => async (dispatch: Dispatch<AppActions>) => {
  if (!firstName && !lastName && !email && !password) {
    dispatch({ type: USER_REGISTER_CLEANUP, payload: undefined });
    return;
  }
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { firstName, lastName, email, password },
  });
  try {
    const { data } = await axios.post('http://localhost:3030/auth/register', {
      firstName,
      lastName,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: USER_REGISTER_FAILURE, payload: err.message });
  }
};