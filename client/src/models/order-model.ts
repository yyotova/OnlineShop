
export interface Order {
  _id?: string;
  userId: string;
  createdAt?: Date;
  items: OrderItem[];
  amount: number;
  updatedAt: Date;
  address: string;
  zipCode: string;
  status?: string;
}

export interface OrderItem {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  qty: number;
  price: number;
  sizselectedItemSize: string;
  itemsInStock: number;
  category: string;
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
