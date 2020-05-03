import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

export enum AlertType {
  SUCCESS,
  FAIL
}

export interface Alert {
  id?: number,
  message: string,
  type: AlertType
}
const ALERT_LIFE_TIME = 2500;

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alerts: Alert[] = [];
  
  
  constructor() { }


  getAlerts(): Alert[] {
    return this.alerts;
  }
  
  add(alert: Alert) {
    alert.id = this.alerts.length;
    this.alerts.push(alert);
    setTimeout( ()=> {this.removeById(alert.id)}, ALERT_LIFE_TIME);
    console.debug(this.alerts);
  }

  addSuccess(message: string) {
    this.add({message, type: AlertType.SUCCESS});
  }

  addFail(message: string) {
    this.add({message, type: AlertType.FAIL});
  }

  removeById(alertId: number) {
    this.alerts = this.alerts.filter( alert => alert.id !== alertId );
  }
  clear() {
    this.alerts = [];
  }
}
