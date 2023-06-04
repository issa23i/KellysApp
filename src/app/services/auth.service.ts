import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin: string = environment.apiUrl + '/auth/login';
  private urlRegister: string = environment.apiUrl + '/auth/register';
  token: any;
  usuario!: Usuario;

  constructor(private http: HttpClient
    , private cookies: CookieService
    , private router: Router) {}

  login(user: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlLogin, user).pipe(
      tap((response) => {
        this.token = response.data.token;
        this.usuario = response;
        this.setUsuario(this.usuario);
      }),
      catchError((error) => {
        console.error('Error en la petición HTTP ', error)
        return throwError('Error en la solicitud HTTP')
      }
    ));
  }

  register(user: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlRegister, user).pipe(
      tap((response) => {
        this.token = response.data.token;
        this.usuario = response;
        this.setUsuario(this.usuario);
      }),
      catchError((error) => {
        console.error('Error en la petición HTTP ', error)
        return throwError('Error en la solicitud HTTP')
      }
    ));
  }

  setToken(token: string) {
    this.cookies.set('token', token, (1 / 24) * 2, '/'); // Expira en 2 horas;);
  }

  setUsuario(usuario: Usuario) {
    this.cookies.set('usuario', JSON.stringify(usuario), (1 / 24) * 2, '/'); // Expira en 2 horas;
  }

  getUsuario() {
    if (this.cookies.check('usuario')) {
      return JSON.parse(this.cookies.get('usuario'));
    }
    console.log('no hay usuario');
    return null;
  }

  getToken() {
    return this.cookies.get('token');
  }

  getIdUsuarioLogged() {
    let usuarioLogged: Usuario = this.getUsuario();
    if (usuarioLogged) {
      return usuarioLogged.data.user._id;
    }
    return null;
  }

  logout() {
    if (this.cookies.check('usuario')) {
      this.cookies.delete('usuario');
    }
    if (this.cookies.check('token')) {
      this.cookies.delete('token');
    }
    this.token = null;
    this.router.navigateByUrl('/home')
  }
}
