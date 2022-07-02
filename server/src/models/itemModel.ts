import * as mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true, default: 0 },
    size: { type: Array, required: true, default: false },
    imageUrl: { type: String, required: true, default: false },
    itemsInStock: { type: String, required: true, default: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("Item", itemSchema);

export default itemModel;
