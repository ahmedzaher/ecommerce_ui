import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: string[] = [];

  constructor() { }


  getMessages(): string[] {
    return this.messages;
  }
  
  add(message: string) {
    this.messages.push(message);
    console.debug(this.messages);
  }

  clear() {
    this.messages = [];
  }
}
