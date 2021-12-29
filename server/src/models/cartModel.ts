import * as mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    //  TODO  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
