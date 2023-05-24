import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Habitacion } from '../interfaces/habitacion';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  private _apiUrlHabitaciones: string = `${environment.apiUrl}/habitaciones`;

  constructor(private http: HttpClient) {}

  obtenerHabitacion(habitacionId: string) {
    return this.http.get<Habitacion>(
      `${this._apiUrlHabitaciones}/${habitacionId}`
    );
  }
}
