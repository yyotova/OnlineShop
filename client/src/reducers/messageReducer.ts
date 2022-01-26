import { MessageActionTypes, SET_MESSAGES, ADD_MESSAGE } from "../constants/action-types";
import { MessageModel } from "../models/message-model";

type MessageState = {
  messageObject: MessageModel;
};

const MessageInitialState: MessageState = {
  messageObject: {
    userId: "",
    username: "",
    messages: [],
  },
};

export const messageReducer = (
  state = MessageInitialState,
  action: MessageActionTypes
) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, messageObject: action.payload };
    case ADD_MESSAGE:
      return {
        ...state, messageObject: {
          ...state.messageObject,
          messages: [...state.messageObject.messages, action.payload]
        }
      }
    default:
      return state;
  }
};
