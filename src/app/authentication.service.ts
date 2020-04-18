import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_URLS } from './api-urls';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { AuthenticationData } from './model/AuthenticationData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  authenticate(authData: AuthenticationData): Observable<{}> {
    return this.httpClient.post<{}>(API_URLS['authenticate'], authData, this.httpOptions)
      .pipe(
        tap((result) => this.setSession(result)),
        catchError(this.handleError<{}>(`authenticate`))
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/store']);
  }

  private setSession(authenticationResult: any) {
    localStorage.setItem("token", authenticationResult.jwttoken);
  }

  private isTokenExpired(token: string) {
    let expirationDate = new Date ( +JSON.parse(atob(token.split('.')[1])).exp * 1000 );
    return new Date() > expirationDate;

  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const errorCode: any = error.status || 500
      return of(errorCode);
    };
  }
}
