import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from'@ngxs/store';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest;
    
    this.store.select(state => state.auth.token).subscribe(e => {
      if(e){
        console.log('This is the stuff: ', e);
        modifiedRequest = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + e
          }
        });
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          sessionStorage.clear();
          location.reload();
          // this.router.navigate(['/']);
        }
        return  throwError (  err  ) ;
      })
    );
  }
}
