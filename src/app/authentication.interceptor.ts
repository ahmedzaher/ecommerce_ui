import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem("token");
    if (token) {
      const authenticatedRequest = request.clone({
        headers: 
          request.headers
          .append("Authorization", "Bearer " + token)

      });
    return next.handle(authenticatedRequest);
  }

    return next.handle(request);
  }
}
