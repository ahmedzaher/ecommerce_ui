import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StoreItem } from './model/StoreItem';
import { MessagesService } from './messages.service';
import { API_URLS } from './api-urls';
import { ServiceErrorHandler } from './service-error-handler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private httpClient: HttpClient,
    private messagesService: MessagesService,
    private serviceErrorHandler: ServiceErrorHandler
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getUserCart(): Observable<any> {
    return this.httpClient.get<any>(API_URLS['get-user-cart'])
      .pipe(
        tap( () => this.messagesService.add(`User cart loaded`)),
        catchError(this.serviceErrorHandler.handleError<any>('getUserCart'))
      );
  }

  addToCart(itemId: number): Observable<any> {
      return this.httpClient.post<any>(API_URLS['add-cart-item'],
        {itemId}, this.httpOptions)
        .pipe(
          tap( () => this.messagesService.add(`Cart item added`)),
          catchError(this.serviceErrorHandler.handleError<any>('addToCart'))
        );
  }
}
