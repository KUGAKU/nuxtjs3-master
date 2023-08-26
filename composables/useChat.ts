import {
  ChatMessageDataSource,
  IChatMessageDataSource,
} from '../service/chatMessageDataSource';
import { ChatRepository, IChatRepository } from '../repository/chatRepository';
import { container } from 'tsyringe';

export function useChat() {
  const runtimeConfig = useRuntimeConfig();
  const chatResponseData = useState('chatResponseDataKey', () => '');
  const isLoading = useState('isLoadingKey', () => false);
  const conversationId = useState<string | null>(
    'conversationIdKey',
    () => null
  );

  const chatMessageDataSource = container.resolve<IChatMessageDataSource>(
    ChatMessageDataSource
  );
  const chatRepository = container.resolve<IChatRepository>(ChatRepository);

  // 新しい会話を作成する時に呼び出す
  const clearConversationId = () => {
    conversationId.value = null;
  };

  // 会話を選択した時に呼び出す
  const setConversationId = (targetConversationId: string) => {
    conversationId.value = targetConversationId;
  };

  const listenToChatMessage = async (chatMessage: string) => {
    isLoading.value = true;
    try {
      chatMessageDataSource.getDataStream().subscribe({
        next: (data) => {
          chatResponseData.value += data.chat_content;
          conversationId.value = data.conversation_id;
        },
        error: (err) => console.error('something wrong occurred: ' + err),
        complete: () => {
          isLoading.value = false;
        },
      });
      const eventSource = new EventSource(
        `${runtimeConfig.public.backendApiBaseUrl}chat/?conversation_id=${conversationId.value}&chat_message=${chatMessage}`
      );
      chatRepository.listenToSSEChatMessage(eventSource, chatMessageDataSource);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    chatResponseData,
    listenToChatMessage,
    isLoading,
    clearConversationId,
  };
}
