import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { AuthInterceptorService } from './auth-interceptor.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private httpClient : HttpClient
    , private authService: AuthService
    , private router : Router) { 
  }

  getIdUsuario(){
    return this.authService.getIdUsuarioLogged()
  }

  public obtenerPersona () {
    let id = this.getIdUsuario()
    
    // puede que id sea null, si se borra la cookie 'usuario'
    if(!id) {
      this.router.navigateByUrl('/login')
      throw new Error('Usuario no identificado.');
    }
    return this.httpClient.get<Persona>(`${environment.apiUrl}/personas/${id}`)
  }

}
