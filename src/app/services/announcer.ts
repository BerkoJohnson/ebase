import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Message {
  type: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class Announcer {
 private _message = new BehaviorSubject<Message>(null);
 public message$ = this._message.asObservable();
  constructor() { }

  send(message: Message | null) {
    this._message.next(message);
  }
}
