import { Observable, Subject } from 'rxjs';
import { singleton } from 'tsyringe';

export interface IChatMessageDataSource {
  getDataStream(): Observable<string>;
  pushData(data: string): void;
  complete(): void;
}

@singleton()
export class ChatMessageDataSource implements IChatMessageDataSource {
  private subject: Subject<string>;

  constructor() {
    this.subject = new Subject<string>();
  }

  private recreateSubjectIfNecessary(): void {
    // subjectがcompleteされている場合は新しいSubjectを作成
    if (this.subject.closed) {
      this.subject = new Subject<string>();
    }
  }

  getDataStream(): Observable<string> {
    this.recreateSubjectIfNecessary();
    return this.subject.asObservable();
  }

  pushData(data: string): void {
    this.recreateSubjectIfNecessary();
    this.subject.next(data);
  }

  complete(): void {
    this.subject.unsubscribe();
  }
}
