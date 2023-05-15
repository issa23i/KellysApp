import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PersonaService } from './persona.service';
import { Reserva } from '../interfaces/reserva';
import { environment } from 'src/environments/environment';
import { ResultadoBusqueda } from '../interfaces/resultado-busqueda';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private _reserva!: Reserva;
  
  constructor(private httpClient: HttpClient
    , private personaService : PersonaService
  ) { }

  newReserva (resultadoBusqueda : ResultadoBusqueda){
    let usuarioId  = this.personaService.getIdUsuario()
    if(usuarioId){
      let reserva : Reserva = {
      cliente : usuarioId,
      hotel: resultadoBusqueda.hotel,
      fechaCheckin: resultadoBusqueda.fechaCheckin,
      fechaCheckout: resultadoBusqueda.fechaCheckout,
      numPlazas: resultadoBusqueda.numPlazas,
      habitacion: resultadoBusqueda.habitacion,
      aceptada: false
      }
      this._reserva = reserva
    } 
    }
    

  getReserva(id : string){
    return this.httpClient.get<Reserva>(`${environment.apiUrl}/reservas/${id}`)
  }
}
