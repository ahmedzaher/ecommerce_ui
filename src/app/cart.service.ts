import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StoreItem } from './model/StoreItem';
import { AlertsService } from './alerts.service';
import { API_URLS } from './api-urls';
import { ServiceErrorHandler } from './service-error-handler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private httpClient: HttpClient,
    private serviceErrorHandler: ServiceErrorHandler
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getUserCart(): Observable<any> {
    return this.httpClient.get<any>(API_URLS['get-user-cart'])
      .pipe(
        catchError(this.serviceErrorHandler.handleError<any>('getUserCart'))
      );
  }

  addToCart(itemId: number): Observable<any> {
      return this.httpClient.post<any>(API_URLS['add-cart-item'],
        {itemId}, this.httpOptions)
        .pipe(
          tap( () => console.log(`Item add to cart`)),
          catchError(this.serviceErrorHandler.handleError<any>('addToCart'))
        );
  }

  removeFromCart(cartId:number, itemId: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URLS['delete-cart-item']}/${cartId}/item/${itemId}`)
      .pipe(
        tap( () => console.log(`Item deleted from cart`)),
        catchError(this.serviceErrorHandler.handleError<any>('removeFromCart'))
      );
}
}
