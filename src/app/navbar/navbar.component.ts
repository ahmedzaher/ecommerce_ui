import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  @Output() openAuthentication: EventEmitter<any> = new EventEmitter();

  onClickLogin() {
    this.openAuthentication.emit();
  }
  onClickLogout() {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean{
    return this.authenticationService.isAuthenticated();
  }
}
