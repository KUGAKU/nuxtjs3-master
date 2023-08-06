import {
  ChatMessageDataSource,
  IChatMessageDataSource,
} from '../service/chatMessageDataSource';
import { injectable, container } from 'tsyringe';

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
      console.log('EventSource Connection Opened:', event);
    };
    eventSource.onerror = (err) => {
      console.error('EventSource Error:', err);
      chatMessageDataSource.complete();
      eventSource.close();
    };
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message === 'done') {
        chatMessageDataSource.complete();
        eventSource.close();
        return;
      }
      chatMessageDataSource.pushData(data.message);
    };
  }
}
