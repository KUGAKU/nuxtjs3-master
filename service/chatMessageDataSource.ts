import { Observable, Subject } from 'rxjs';
import { injectable, singleton } from 'tsyringe';

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

  getDataStream(): Observable<string> {
    return this.subject.asObservable();
  }

  pushData(data: string): void {
    this.subject.next(data);
  }

  complete(): void {
    this.subject.complete();
  }
}
