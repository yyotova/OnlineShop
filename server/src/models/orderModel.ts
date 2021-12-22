import * as mongoose from "mongoose";
import { StatusOrder } from "../enums/statusOrder";

const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    // TODO userId: { type: String, required: true },
    items: [orderItemSchema],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: StatusOrder.PENDING },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
