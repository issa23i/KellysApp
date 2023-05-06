import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParamBuscar } from '../interfaces/param-buscar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private _parametrosBusqueda!: ParamBuscar;
  

  private _apiUrlBuscar : string = `${environment.apiUrl}/buscar`;

  constructor(private http: HttpClient) { }


  buscar(parametrosBusqueda: ParamBuscar): Observable<any>{
    this._parametrosBusqueda = parametrosBusqueda;
  
    let checkIn = new Date(parametrosBusqueda.checkIn);
    let checkOut = new Date(parametrosBusqueda.checkOut);
  

  console.log(parametrosBusqueda)
    return this.http.post<any>(this._apiUrlBuscar, parametrosBusqueda);
  }


  public get parametrosBusqueda(): ParamBuscar {
    return this._parametrosBusqueda;
  }
  public set parametrosBusqueda(value: ParamBuscar) {
    this._parametrosBusqueda = value;
  }
}
