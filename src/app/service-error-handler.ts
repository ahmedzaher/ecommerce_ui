import { Injectable } from "@angular/core"
import { Observable, of } from 'rxjs';
import { AlertsService } from './alerts.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceErrorHandler {

    constructor(
        private alertsService: AlertsService
    ) { }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption

            // Let the app keep running by returning an empty result.
            
            if(result) {
                return of(result as T);
                
            } else {
                const errorResult = {
                    error: error.status
                 } 
                return of(errorResult as any);
            }
            
        };
    }
}