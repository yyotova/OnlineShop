import { ProductType } from "./product-model";
import {
  RegisterAndUpdateActions,
  LoginActions,
  UserListActions,
} from "./user-types";
import { OrderCreate } from "./order-model";

export type IdType = string;

// Redux state
export interface ReduxState {
  allProducts: ProductType[];
  userRegister: RegisterAndUpdateActions;
  userLogin: LoginActions;
  userList: UserListActions;
  userDelete: any;
  listOrders: OrderCreate;
  deleteOrders: OrderCreate;
  updateOrder: OrderCreate;
}

export type getStateType = () => ReduxState;

export interface LooseObject {
  [key: string]: any;
}
