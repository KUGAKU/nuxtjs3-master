import {
  ChatMessageDataSource,
  IChatMessageDataSource,
} from '../service/chatMessageDataSource';
import { injectable, container } from 'tsyringe';

export interface IChatRepository {
  listenToSSEChatMessage(): Promise<void>;
}

@injectable()
export class ChatRepository implements IChatRepository {
  private chatMessageDataSource = container.resolve<IChatMessageDataSource>(
    ChatMessageDataSource
  );

  async listenToSSEChatMessage() {
    const response = await fetch('http://127.0.0.1:8000/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
    const readableStreamBody = response.body;

    if (readableStreamBody == null) {
      throw new Error('Response body is null');
    }

    const reader = readableStreamBody
      .pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        this.chatMessageDataSource.complete();
        break;
      }
      this.chatMessageDataSource.pushData(value);
    }
  }
}
