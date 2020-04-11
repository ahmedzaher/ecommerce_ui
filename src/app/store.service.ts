import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StoreItem } from './model/StoreItem';
import { MessagesService } from './messages.service';
import { API_URLS } from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private httpClient: HttpClient,
    private messagesService: MessagesService
  ) { }

  getStoreItems(): Observable<StoreItem[]> {
      return this.httpClient.get<StoreItem[]>(API_URLS['store'])
        .pipe(
          tap( () => this.log(`Store items loaded`)),
          catchError(this.handleError<StoreItem[]>('getStoreItems'))
        );
  }

  log(message: string) {
    this.messagesService.add(message)
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

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
