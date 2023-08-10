import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const TOKEN = '6ec9291bb868bc749351843b36e424798c213d14';
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + TOKEN },
    });
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }
}
