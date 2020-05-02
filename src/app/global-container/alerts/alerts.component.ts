import { Component, OnInit } from '@angular/core';
import { AlertsService, AlertType } from 'src/app/alerts.service';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {


  public AlertType = AlertType;

  constructor(
    public alertsService: AlertsService
  ) { }

  ngOnInit(): void {
  }
}
