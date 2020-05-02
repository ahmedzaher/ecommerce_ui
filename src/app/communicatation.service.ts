import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatationService {

  private requireAuthenticationSubject: Subject<any> = new Subject();
  private alertSuccessSubject: Subject<string> = new Subject();
  private alertFailSubject: Subject<string> = new Subject();

  requireAuthenticationEmit() {
    this.requireAuthenticationSubject.next();
  }

  onRequireAuthentication() {
    return this.requireAuthenticationSubject;
  }

  alertSuccessEmit(message: string) {
    this.alertFailSubject.next(message);
  }

  onAlertSuccess() {
    return this.alertSuccessSubject;
  }

  alertFailEmit(message: string) {
    this.alertFailSubject.next(message);
  }

  onAlertFail() {
    return this.alertFailSubject;
  }


  constructor() { }
}
