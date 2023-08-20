import { ChatSSEData } from 'repository/chatRepository';
import { Observable, Subject } from 'rxjs';
import { singleton } from 'tsyringe';

export interface IChatMessageDataSource {
  getDataStream(): Observable<ChatSSEData>;
  pushData(data: ChatSSEData): void;
  complete(): void;
}

@singleton()
export class ChatMessageDataSource implements IChatMessageDataSource {
  private subject: Subject<ChatSSEData>;

  constructor() {
    this.subject = new Subject<ChatSSEData>();
  }

  private recreateSubjectIfNecessary(): void {
    // subjectがcompleteされている場合は新しいSubjectを作成
    if (this.subject.closed) {
      this.subject = new Subject<ChatSSEData>();
    }
  }

  getDataStream(): Observable<ChatSSEData> {
    this.recreateSubjectIfNecessary();
    return this.subject.asObservable();
  }

  pushData(data: ChatSSEData): void {
    this.recreateSubjectIfNecessary();
    this.subject.next(data);
  }

  complete(): void {
    this.subject.unsubscribe();
  }
}
