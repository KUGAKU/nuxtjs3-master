import {
  ChatMessageDataSource,
  IChatMessageDataSource,
} from '../service/chatMessageDataSource';
import { ChatRepository, IChatRepository } from '../repository/chatRepository';
import { container } from 'tsyringe';
import { Message, MessageType } from '../types/conversation';

export function useChat() {
  const chatMessageDataSource = container.resolve<IChatMessageDataSource>(
    ChatMessageDataSource
  );
  const chatRepository = container.resolve<IChatRepository>(ChatRepository);

  const messages = useState<Message[]>('messagesKey', () => []);
  const isLoading = useState<boolean>('isLoadingKey', () => false);
  const conversationId = useState<string | null>(
    'conversationIdKey',
    () => null
  );

  // when user send message, call this function to add human message and ai message to messages
  const addHumanMessageToMessages = (message: string) => {
    messages.value.push({
      messageContent: message,
      messageType: MessageType.HUMAN,
    });
  };

  const isAIMessageFirstTurn = (messagesLastIndex: number) => {
    if (messages.value[messagesLastIndex].messageType === MessageType.HUMAN) {
      return true;
    }
    return false;
  };

  const streamAICharToMessages = (message: string) => {
    const messagesLastIndex = messages.value.length - 1; // get last index of messages.
    if (isAIMessageFirstTurn(messagesLastIndex)) {
      messages.value.push({
        messageContent: message,
        messageType: MessageType.ARTIFICIAL_INTELLIGENCE,
      });
    }
    messages.value[messagesLastIndex].messageContent += message; // update messageContent of last index of messages.
  };

  // when user create new conversation, call this function to clear messages
  const clearMessages = () => {
    messages.value = [];
  };

  // when user create new conversation, call this function to clear conversationId
  const clearConversationId = () => {
    conversationId.value = null;
  };

  const listenToChatMessage = async (chatMessage: string) => {
    isLoading.value = true;
    try {
      chatMessageDataSource.getDataStream().subscribe({
        next: (data) => {
          streamAICharToMessages(data.chat_content);
          conversationId.value = data.conversation_id;
        },
        error: (err) => console.error('something wrong occurred: ' + err),
        complete: () => {
          isLoading.value = false;
        },
      });
      // const eventSource = new EventSource(
      //   `${runtimeConfig.public.backendApiBaseUrl}chat/?conversation_id=${conversationId.value}&chat_message=${chatMessage}`
      // );
      chatRepository.listenToSSEChatMessage(
        chatMessage,
        chatMessageDataSource,
        conversationId.value
      );
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    listenToChatMessage,
    clearConversationId,
    addHumanMessageToMessages,
    clearMessages,
  };
}
