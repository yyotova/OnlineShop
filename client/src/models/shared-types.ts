import { ProductType } from "./product-model";
import { RegisterAndUpdateActions, LoginActions, UserListActions } from "./user-types";

export type IdType = string;

// Redux state
export interface ReduxState {
  allProducts: ProductType[];
  userRegister: RegisterAndUpdateActions;
  userLogin: LoginActions;
  userList: UserListActions;
  userDelete: any;
}

export type getStateType = () => ReduxState;
