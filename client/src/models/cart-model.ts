import { IdType } from "./shared-types";

export interface CartItemType {
  itemId: IdType;
  price?: number;
  quantity: number;
  selectedItemSize: string;
}

export interface CartType {
  _id: IdType;
  userId: IdType;
  items: CartItemType[];
}
