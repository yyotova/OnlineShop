import * as mongoose from "mongoose";
import { StatusOrder } from "../utilities/enums/statusOrder";

const orderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true, default: 0 },
  size: { type: Array, required: true, default: false },
  imageUrl: { type: String, required: true, default: false },
  itemsInStock: { type: String, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  quantity: { type: Number, default: 1 },
  selectedItemSize: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    status: { type: String, default: StatusOrder.PENDING },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
