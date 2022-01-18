export interface MessageModel {
  userId: string;
  username?: string;
  messages: MessageType[];
}

export interface MessageType {
  message: string;
  time: string;
  toAdmin: boolean;
}
