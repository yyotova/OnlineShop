import * as mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  //  TODO userId: { type: String, required: true },
  items: [cartItemSchema],
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
