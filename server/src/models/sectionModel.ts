import * as mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const sectionModel = mongoose.model("Section", sectionSchema);

export default sectionModel;
