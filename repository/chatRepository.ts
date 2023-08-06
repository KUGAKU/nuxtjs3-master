import {
  ChatMessageDataSource,
  IChatMessageDataSource,
} from '../service/chatMessageDataSource';
import { injectable, container } from 'tsyringe';

export interface IChatRepository {
  listenToSSEChatMessage(eventSource: EventSource): void;
}

@injectable()
export class ChatRepository implements IChatRepository {
  private chatMessageDataSource = container.resolve<IChatMessageDataSource>(
    ChatMessageDataSource
  );

  listenToSSEChatMessage(eventSource: EventSource) {
    eventSource.onopen = (event) => {
      console.log('EventSource Connection Opened:', event);
    };
    eventSource.onerror = (err) => {
      console.error('EventSource Error:', err);
      this.chatMessageDataSource.complete();
      eventSource.close();
    };
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message === 'done') {
        this.chatMessageDataSource.complete();
        eventSource.close();
        return;
      }
      this.chatMessageDataSource.pushData(data.message);
    };
  }
}
