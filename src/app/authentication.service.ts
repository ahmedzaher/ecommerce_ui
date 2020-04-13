import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_URLS } from './api-urls';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationData } from './model/AuthenticationData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  authenticate(authData: AuthenticationData): Observable<{}> {
    return this.httpClient.post<{}>(API_URLS['authenticate'], authData, this.httpOptions)
    .pipe(
      tap((result) => this.proceedAuthentication(result)),
      catchError(this.handleError<{}>(`authenticate`))
    );
  }

  private proceedAuthentication(authenticationResult) {
     console.log(`Authenticated ${authenticationResult.jwttoken}`);
    localStorage.setItem("token", authenticationResult.jwttoken);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") ? true : false;
  }

  logout() {
    localStorage.removeItem("token");
  }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
