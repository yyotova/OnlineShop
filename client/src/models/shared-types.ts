import { ProductType } from "./product-model";
import { RegisterAndUpdateActions, LoginActions } from "./user-types";

export type IdType = string;

// Redux state
export interface ReduxState {
  allProducts: ProductType[];
  userRegister: RegisterAndUpdateActions;
  userLogin: LoginActions;
}

export type getStateType = () => ReduxState;

export interface LooseObject {
  [key: string]: any;
}
