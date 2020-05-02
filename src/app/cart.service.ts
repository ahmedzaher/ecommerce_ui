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
    private alertsService: AlertsService,
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
          tap( () => this.alertsService.addSuccess(`Item add to cart`)),
          catchError(this.serviceErrorHandler.handleError<any>('addToCart'))
        );
  }
}
