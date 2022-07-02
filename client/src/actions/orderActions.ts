import { Order } from "../models/order-model";
import { Dispatch } from "react";
import {
  AppActions,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  LIST_ORDER_REQUEST,
  LIST_ORDER_SUCCESS,
  LIST_ORDER_FAILURE,
} from "../constants/action-types";
import { getStateType } from "../models/shared-types";
import axios from "axios";

export const createOrder =
  (order: Order) =>
  async (dispatch: Dispatch<AppActions>, getState: getStateType) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
      const {
        userLogin: { userInfo },
      } = getState();
      if (userInfo) {
        const {
          data: { data: newOrder },
        } = await axios.post("http://localhost:3030/api/orders", order, {
          headers: {
            "x-auth": userInfo.token || "",
          },
        });
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder });
      }
    } catch (error: any) {
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
  };

export const updateOrder =
  (order: Order) =>
  async (dispatch: Dispatch<AppActions>, getState: getStateType) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST, payload: order });
      const {
        userLogin: { userInfo },
      } = getState();
      if (userInfo) {
        const {
          data: { data: newOrder },
        } = await axios.put(
          `http://localhost:3030/api/orders/${order._id}`,
          order,
          {
            headers: {
              "x-auth": userInfo.token || "",
            },
          }
        );

        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: newOrder });
      }
    } catch (error: any) {
      dispatch({ type: UPDATE_ORDER_FAILURE, payload: error.message });
    }
  };

export const deleteOrder =
  (orderId: string) =>
  async (dispatch: Dispatch<AppActions>, getState: getStateType) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST, payload: orderId });
      const {
        userLogin: { userInfo },
      } = getState();
      if (userInfo) {
        const {
          data: { data: newOrder },
        } = await axios.delete(`http://localhost:3030/api/orders/${orderId}`, {
          headers: {
            "x-auth": userInfo.token || "",
          },
        });
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: newOrder });
      }
    } catch (error: any) {
      dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
  };

export const listOrders =
  () => async (dispatch: Dispatch<AppActions>, getState: getStateType) => {
    try {
      dispatch({ type: LIST_ORDER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      if (userInfo) {
        const { data } = await axios.get("http://localhost:3030/api/orders", {
          headers: {
            "x-auth": userInfo.token || "",
          },
        });
        const result = data.map((order: any) => {
          order.createdAt = new Date(order.createdAt);
          return order as Order;
        }) as Order[];
        dispatch({ type: LIST_ORDER_SUCCESS, payload: result });
      }
    } catch (error: any) {
      dispatch({ type: LIST_ORDER_FAILURE, payload: error.message });
    }
  };
