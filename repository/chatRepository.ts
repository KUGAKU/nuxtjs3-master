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
  ERROR = 'error', // 接続中のstream内でエラーが発生した場合にErrorメッセージが返されます。
}

export interface ProgressionSSEData {
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
        if (event.event === ChatSSEEvent.COMPLETE) {
          console.info('fetchEventSource Complete:', event);
          chatMessageDataSource.complete();
          return;
        }

        if (event.event === ChatSSEEvent.PROGRESSION) {
          const data: ProgressionSSEData = JSON.parse(event.data);
          chatMessageDataSource.pushData(data);
          return;
        }

        if (event.event === ChatSSEEvent.ERROR) {
          console.error('fetchEventSource Error:', event);
          chatMessageDataSource.complete();
          throw new Error(event.data);
        }
      },

      onerror(err) {
        // onerrorイベントは、ネットワークの切断された場合、Server Sent Event形式のデータが正しくない場合、接続中のStream内で返却されたErrorメッセージから返された例外がある場合にのみ発生します。
        console.error(`fetchEventSource Error: ${JSON.stringify(err)}`);
        chatMessageDataSource.complete();
        throw err;
      },
    });
  }
}
