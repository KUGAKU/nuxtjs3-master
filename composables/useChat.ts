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

  const chatMessageDataSource = container.resolve<IChatMessageDataSource>(
    ChatMessageDataSource
  );
  const chatRepository = container.resolve<IChatRepository>(ChatRepository);

  const listenToChatMessage = async (chatMessage: string) => {
    isLoading.value = true;
    try {
      chatMessageDataSource.getDataStream().subscribe({
        next: (data) => {
          chatResponseData.value += data;
        },
        error: (err) => console.error('something wrong occurred: ' + err),
        complete: () => {
          isLoading.value = false;
        },
      });
      const eventSource = new EventSource(
        `${runtimeConfig.public.backend_api_base_url}chat/?chatMessage=${chatMessage}`
      );
      chatRepository.listenToSSEChatMessage(eventSource, chatMessageDataSource);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { chatResponseData, listenToChatMessage, isLoading };
}
