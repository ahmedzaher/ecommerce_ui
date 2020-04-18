import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StoreItem } from './model/StoreItem';
import { MessagesService } from './messages.service';
import { API_URLS } from './api-urls';
import { ServiceErrorHandler } from './service-error-handler';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private httpClient: HttpClient,
    private messagesService: MessagesService,
    private serviceErrorHandler: ServiceErrorHandler
  ) { }

  getStoreItems(filter): Observable<StoreItem[]> {
      return this.httpClient.get<StoreItem[]>(API_URLS['store'], {params: filter})
        .pipe(
          tap( () => this.messagesService.add(`Store items loaded`)),
          catchError(this.serviceErrorHandler.handleError<StoreItem[]>('getStoreItems'))
        );
  }
}
