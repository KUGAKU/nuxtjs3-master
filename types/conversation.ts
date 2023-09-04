export enum MessageType {
  HUMAN = 1,
  ARTIFICIAL_INTELLIGENCE = 2,
}

export interface Conversation {
  readonly conversationId: string; // UUID
  readonly conversationTitle: string;
  readonly messages: Message[];
}

export interface Message {
  messageContent: string;
  messageType: MessageType;
}
