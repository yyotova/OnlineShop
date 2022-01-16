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
  LIST_ORDER_FAILURE
} from "../constants/action-types";
import { OrderCreate, OrderDelete, OrderList } from "../models/order-model";

const orderCreateState: OrderCreate = { loading: false };

export const orderCreateReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { 
        loading: true
      };
    case CREATE_ORDER_SUCCESS:
      return { 
        loading: false, 
        order: action.payload, 
        success: true 
      };
    case CREATE_ORDER_FAILURE:
      return { 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};

export const orderUpdateReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { 
        loading: true 
      };
    case UPDATE_ORDER_SUCCESS:
      return { 
        loading: false, 
        order: action.payload, 
        success: true 
      };
    case UPDATE_ORDER_FAILURE:
      return { 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};

const orderDeleteState: OrderDelete = { loading: false };

export const orderDeleteReducer = (state = orderDeleteState, action: AppActions) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return { 
        loading: true 
      };
    case DELETE_ORDER_SUCCESS:
      return { 
        loading: false, 
        order: action.payload, 
        success: true 
      };
    case DELETE_ORDER_FAILURE:
      return { 
        loading: false,
        error: action.payload 
      };
    default:
      return state;
  }
};

export const orderListReducer = (state = orderCreateState, action: AppActions): OrderList => {
  switch (action.type) {
    case LIST_ORDER_REQUEST:
      return { loading: true };
    case LIST_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case LIST_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};