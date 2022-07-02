import * as mongoose from "mongoose";
import { minLength, maxLength } from "../utilities/validations/messages";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, minLength("Category name", 2)],
      maxlength: [15, maxLength("Category name", 15)],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
