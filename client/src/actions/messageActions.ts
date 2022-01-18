import { SET_MESSAGES, SetMessagesRequest } from "../constants/action-types";
import { MessageModel } from "../models/message-model";

export const setMessageObject = (
  messages: MessageModel
): SetMessagesRequest => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};
