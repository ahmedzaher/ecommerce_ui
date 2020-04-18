import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-global-container',
  templateUrl: './global-container.component.html',
  styleUrls: ['./global-container.component.css']
})
export class GlobalContainerComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  openAuthentication(): void {
    this.dialog.open(AuthenticationComponent, {
      width: '250px'
    });
    
  }
}
