import { ProductType } from "./product-model";

export type IdType = string;

// Redux state
export interface ReduxState {
  allProducts: ProductType[];
}

export type getStateType = () => ReduxState;
