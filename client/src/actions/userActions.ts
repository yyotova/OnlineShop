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
  USER_LOGIN_FAILURE
} from '../constants/action-types';

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