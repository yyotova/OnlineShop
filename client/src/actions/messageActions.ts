import { SET_MESSAGES, SetMessagesRequest } from "../constants/action-types";
import { MessageModel } from "../models/message-model";

export const setMessages = (messages: MessageModel[]): SetMessagesRequest => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};
