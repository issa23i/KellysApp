import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private _apiUrlHoteles : string = `${environment.apiUrl}/hoteles`;
  
  
 /**
  * Petición http que devuelve un listado de hoteles o error
  * @param http HttpClient
  */
  constructor(private http: HttpClient) { }


  obtenerHoteles (){
    return this.http.get<any>(this._apiUrlHoteles)
  }

  obtenerHotel (hotelId : string){
    return this.http.get<any>(`${this._apiUrlHoteles}/${hotelId}`)
  }

  addHotel (hotel: Hotel){
    return this.http.post<any>(this._apiUrlHoteles, hotel)
  }

  deleteHotel (hotelId: string){
    return this.http.delete<any>(`${this._apiUrlHoteles}/${hotelId}`)
  }
}
