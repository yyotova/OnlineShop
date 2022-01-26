export interface MessageModel {
  userId: string;
  username?: string;
  toAdmin?: boolean;
  messages: MessageType[];
}

export interface MessageType {
  message: string;
  time: string;
  toAdmin: boolean;
}
