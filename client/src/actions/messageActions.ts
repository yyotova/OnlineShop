import { SET_MESSAGES, ADD_MESSAGE, SetMessagesRequest } from "../constants/action-types";
import { MessageModel, MessageType } from "../models/message-model";

export const setMessageObject = (
  messages: MessageModel
): SetMessagesRequest => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const addMessage = (message: MessageType) => {
  return {
    type: ADD_MESSAGE,
    payload: message
  }
}
