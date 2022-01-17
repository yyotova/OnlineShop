import * as mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  message: { type: String, required: true },
  time: { type: String, required: true },
});

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
