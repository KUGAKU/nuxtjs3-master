import {
  EventStreamContentType,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import { IChatMessageDataSource } from '../service/chatMessageDataSource';
import { injectable } from 'tsyringe';
import { useAuth } from '../composables/useAuth';

enum ChatSSEEvent {
  PROGRESSION = 'progression', // SSEによってチャットメッセージを送信している事を示します。
  COMPLETE = 'complete', // SSEによってチャットメッセージの送信が完了した事を示します。
  ERROR = 'error', // SSEによってチャットメッセージの送信が失敗した事を示します。
}

export interface ChatSSEData {
  readonly chat_content: string;
  readonly conversation_id: string | null;
}

export interface IChatRepository {
  listenToSSEChatMessage(
    message: string,
    chatMessageDataSource: IChatMessageDataSource,
    conversationId: string | null
  ): void;
}

@injectable()
export class ChatRepository implements IChatRepository {
  listenToSSEChatMessage(
    message: string,
    chatMessageDataSource: IChatMessageDataSource,
    conversationId: string | null
  ) {
    const { accessToken } = useAuth();
    const runtimeConfig = useRuntimeConfig();
    fetchEventSource(`${runtimeConfig.public.backendApiBaseUrl}chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        chat_message: message,
      }),

      async onopen(response) {
        console.info('fetchEventSource Connection Opened:', response);
        if (
          response.ok &&
          response.headers.get('content-type') === EventStreamContentType
        ) {
          return;
        }
      },

      onmessage(event) {
        const data: ChatSSEData = JSON.parse(event.data);
        if (event.event === ChatSSEEvent.COMPLETE) {
          console.info('fetchEventSource Complete:', event);
          chatMessageDataSource.pushData(data);
          chatMessageDataSource.complete();
          return;
        }

        if (event.event === ChatSSEEvent.PROGRESSION) {
          chatMessageDataSource.pushData(data);
        }
      },

      onerror(err) {
        console.error(`fetchEventSource Error: ${JSON.stringify(err)}`);
        chatMessageDataSource.complete();
        throw err;
      },
    });
  }
}
