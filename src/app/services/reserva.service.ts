import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaService } from './persona.service';
import { Reserva } from '../interfaces/reserva';
import { environment } from 'src/environments/environment';
import { ResultadoBusqueda } from '../interfaces/resultado-busqueda';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private _reserva!: Reserva;
  public get reserva(): Reserva {
    return this._reserva;
  }

  constructor(
    private httpClient: HttpClient,
    private personaService: PersonaService,

    private alertController: AlertController
  ) {}

  newReserva(resultadoBusqueda: ResultadoBusqueda) {
    let usuarioId = this.personaService.getIdUsuario();
    if (usuarioId) {
      let reserva: Reserva = {
        cliente: usuarioId,
        hotel: resultadoBusqueda.hotelId,
        fechaCheckin: resultadoBusqueda.fechaCheckin,
        fechaCheckout: resultadoBusqueda.fechaCheckout,
        numPlazas: resultadoBusqueda.numPlazas,
        habitacion: resultadoBusqueda.habitacionId,
        aceptada: false,
        precioTotal: resultadoBusqueda.precioTotal,
      };
      this._reserva = reserva;
      return true;
    } else {
      return false;
    }
  }

  setReserva() : Observable<Reserva>{
    return this.httpClient.post<Reserva>(`${environment.apiUrl}/reservas`, this._reserva);
  }

  getReserva(id: string) {
    return this.httpClient.get<Reserva>(`${environment.apiUrl}/reservas/${id}`);
  }
}
