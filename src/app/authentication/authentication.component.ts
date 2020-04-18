import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface AuthData {
  username: string;
  password: string;
}

const errorMessages = {
  401: "Invalid username or password",
  500: "Unexpected Error"
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  
  private redirectUrl = '/store';
  error: string | null;
  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(' '),
  });
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['redirect-url'] ) {
        this.redirectUrl = params['redirect-url'];
      }
      if (params['error'] ) {
        this.error = params['error'];
      }
    });
  }

  authenticate() {
    let authData = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    }
    if (this.form.valid) {
      this.authenticationService.authenticate(authData)
      .subscribe((response) => this.handleAuthentication(response));
    } else {
      this.error = 'invalid';
    }
  }
  private handleAuthentication(response: any) { 
    if(response.jwttoken) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.error = errorMessages[response];
    }
  }
}
