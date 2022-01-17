import { MessageActionTypes, SET_MESSAGES } from "../constants/action-types";
import { MessageModel } from "../models/message-model";

type MessageState = {
  messages: MessageModel[];
};

const MessageInitialState: MessageState = {
  messages: [],
};

export const messageReducer = (
  state = MessageInitialState,
  action: MessageActionTypes
) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
