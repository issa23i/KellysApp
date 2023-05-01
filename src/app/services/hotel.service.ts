import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private _apiUrlHoteles : string = `${environment.apiUrl}/hoteles`;
  private _hoteles: Hotel[] = [];
  
 /**
  * Petición http que devuelve un listado de hoteles o error
  * @param http HttpClient
  */
  constructor(private http: HttpClient) { 
    this.http.get<Hotel[]>(this._apiUrlHoteles)
    .subscribe({
      next: (resp: Hotel[]) => {
        this._hoteles = resp
        console.log(resp)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  public get hoteles(): Hotel[] {
    return this._hoteles;
  }
  public set hoteles(value: Hotel[]) {
    this._hoteles = value;
  }


}
