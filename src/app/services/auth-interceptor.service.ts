import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private token: string = ''; // Almacena el valor del token

  constructor(private authService: AuthService) { }

  // TODO: Llevar un control del interceptor, borrar este contador antes de la entrega
  contadorInterceptar = 0
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.contadorInterceptar++
    console.log('interceptar '+ this.contadorInterceptar + ' veces')
    if (!this.token) {
      this.token = this.authService.getToken(); // Obtiene el token solo si no está almacenado
    }

    if (this.token) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        console.error('Error en la petición HTTP ', error)
        return throwError('Error en la petición HTTP')
      })
    )
  }
}
