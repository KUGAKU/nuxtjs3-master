import { IChatMessageDataSource } from '../service/chatMessageDataSource';
import { injectable } from 'tsyringe';

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
    eventSource: EventSource,
    chatMessageDataSource: IChatMessageDataSource
  ): void;
}

@injectable()
export class ChatRepository implements IChatRepository {
  listenToSSEChatMessage(
    eventSource: EventSource,
    chatMessageDataSource: IChatMessageDataSource
  ) {
    eventSource.onopen = (event) => {
      console.info('EventSource Connection Opened:', event);
    };
    eventSource.addEventListener(ChatSSEEvent.PROGRESSION, (event) => {
      const data: ChatSSEData = JSON.parse(event.data);
      chatMessageDataSource.pushData(data);
    });
    eventSource.addEventListener(ChatSSEEvent.COMPLETE, (event) => {
      console.info('EventSource Complete:', event);
      const data: ChatSSEData = JSON.parse(event.data);
      chatMessageDataSource.pushData(data);
      chatMessageDataSource.complete();
      eventSource.close();
      return;
    });
    eventSource.onerror = (err) => {
      console.error('EventSource Error:', err);
      chatMessageDataSource.complete();
      eventSource.close();
    };
  }
}
