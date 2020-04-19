import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatationService {

  private requireAuthenticationSubject: Subject<any> = new Subject();

  requireAuthenticationEmit() {
    this.requireAuthenticationSubject.next();
  }

  onRequireAuthentication() {
    return this.requireAuthenticationSubject;
  }


  constructor() { }
}
