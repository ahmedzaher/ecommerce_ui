import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CommunicatationService } from '../communicatation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-container',
  templateUrl: './global-container.component.html',
  styleUrls: ['./global-container.component.css']
})
export class GlobalContainerComponent implements OnInit {

  constructor(
    private router: Router,
    private communicatationService: CommunicatationService,
    public authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.handleAuthenticationRequired();

  }
  handleAuthenticationRequired() {
    this.communicatationService.onRequireAuthentication().subscribe(
      () => {
        this.snackBar.open('Please login', 'Login')
          .onAction().subscribe(() => {
            this.router.navigate(['authenticate'])
          })
      })
  }
}
