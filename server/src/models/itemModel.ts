import * as mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true, default: 0 },
  size: { type: Array, required: true, default: false },
  imageUrl: { type: String, required: true, default: false },
  itemsInStock: { type: String, required: true, default: 0 },
  category: { type: Array, required: true, default: "" }
});

const itemModel = mongoose.model("Item", itemSchema);

export default itemModel;
