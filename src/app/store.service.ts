import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StoreItem } from './model/StoreItem';
import { AlertsService } from './alerts.service';
import { API_URLS } from './api-urls';
import { ServiceErrorHandler } from './service-error-handler';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private httpClient: HttpClient,
    private serviceErrorHandler: ServiceErrorHandler
  ) { }

  getStoreItems(filter): Observable<StoreItem[]> {
      return this.httpClient.get<StoreItem[]>(API_URLS['store'], {params: filter})
        .pipe(
          catchError(this.serviceErrorHandler.handleError<StoreItem[]>('getStoreItems'))
        );
  }
}
