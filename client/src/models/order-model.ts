export interface Order {
  _id?: string;
  userId: string;
  createdAt?: Date;
  items: OrderItem[];
  amount: number;
  updatedAt?: Date;
  address: string;
  zipCode: string;
  status?: string;
}

export interface OrderItem {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  selectedItemSize: string;
  itemsInStock: number;
  size: string[];
  categories: string[];
}

export interface OrderCreate {
  loading: boolean;
  order?: Order[];
  success?: boolean;
}

export interface OrderDelete {
  loading: boolean;
  order?: Order[];
  success?: boolean;
}

export interface OrderList {
  loading: boolean;
  order?: Order[];
  success?: boolean;
  error?: string;
}
