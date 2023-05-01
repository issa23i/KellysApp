import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private AuthService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.AuthService)
    const token = this.AuthService.token;
    console.log('Token:', token); // Imprime el valor del token
    if(token){
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(req)
  }
}
