import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { AuthInterceptorService } from './auth-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private httpClient : HttpClient, private authInterceptorService: AuthInterceptorService, private authService: AuthService) { 
  }

  getIdUsuario(){
    return this.authService.getIdUsuarioLogged()
  }

  public obtenerPersona () {
    let id = this.getIdUsuario()
    console.log(id)
    return this.httpClient.get<Persona>(`${environment.apiUrl}/personas/${id}`)
  }

}
