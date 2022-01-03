import * as mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  selectedItemSize: { type: String, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
