import { CategoryType } from "./category-model";

export interface CategoryActions {
  categories: CategoryType[];
  error?: string;
}
