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
    console.log(runtimeConfig.public.backendApiBaseUrl);
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
        //console.info('event:', event);
        const data: ChatSSEData = JSON.parse(event.data);
        if (event.event === ChatSSEEvent.COMPLETE) {
          console.info('fetchEventSource Complete:', event);
          chatMessageDataSource.pushData(data);
          chatMessageDataSource.complete();
          // TODO: ここでeventSource.close()のような処理を行う。
          return;
        }

        if (event.event === ChatSSEEvent.PROGRESSION) {
          chatMessageDataSource.pushData(data);
        }
      },

      onerror(err) {
        console.error('fetchEventSource Error:', err);
        chatMessageDataSource.complete();
        throw err;
      },
    });

    // eventSource.onopen = (event) => {
    //   console.info('EventSource Connection Opened:', event);
    // };
    // eventSource.addEventListener(ChatSSEEvent.PROGRESSION, (event) => {
    //   const data: ChatSSEData = JSON.parse(event.data);
    //   chatMessageDataSource.pushData(data);
    // });
    // eventSource.addEventListener(ChatSSEEvent.COMPLETE, (event) => {
    //   console.info('EventSource Complete:', event);
    //   const data: ChatSSEData = JSON.parse(event.data);
    //   chatMessageDataSource.pushData(data);
    //   chatMessageDataSource.complete();
    //   eventSource.close();
    //   return;
    // });
    // eventSource.onerror = (err) => {
    //   console.error('EventSource Error:', err);
    //   chatMessageDataSource.complete();
    //   eventSource.close();
    // };
  }
}
