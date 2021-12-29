import { IdType } from "./shared-types";

export interface ProductType {
  id: IdType;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string[];
  itemsInStock: number;
  size: string[];
}
