import * as mongoose from "mongoose";

const messageItemSchema = new mongoose.Schema({
  message: { type: String, required: true },
  time: { type: String, required: true },
  toAdmin: { type: Boolean, required: true },
});

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [messageItemSchema],
});

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;

export interface MessageType {
  message: string;
  time: string;
  toAdmin: boolean;
}

export interface MessageObject {
  userId: string;
  username?: string;
  toAdmin?: boolean;
  messages: MessageType[];
}
