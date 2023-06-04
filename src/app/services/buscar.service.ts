import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParamBuscar } from '../interfaces/param-buscar';
import { Observable } from 'rxjs';
import { ResultadoBusqueda } from '../interfaces/resultado-busqueda';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private _parametrosBusqueda!: ParamBuscar;
  private _resultadosBusqueda: ResultadoBusqueda[] = [];

  private _apiUrlBuscar : string = `${environment.apiUrl}/buscar`;

  constructor(private http: HttpClient) { }


  /**
   * 
   * @param hotel si no se pasa hotel hace una búsqueda de habitaciones general,
   *              si pasa un hotel Id, buscará por hotel
   * @returns 
   */
  buscar(hotelId : string = ''){
    if (hotelId) {
      this._apiUrlBuscar = `${this._apiUrlBuscar}/${hotelId}`
    }
    this.http.post<any>(this._apiUrlBuscar, this.parametrosBusqueda)
    .subscribe({
      next: (resp : ResultadoBusqueda[]) => {
        this._resultadosBusqueda = resp
        console.log(resp);
      },
      error: err => {
        console.error('Error al obtener los resultados de la búsqueda ', err);
      }
    });
  }


  public get parametrosBusqueda(): ParamBuscar {
    return this._parametrosBusqueda;
  }
  public set parametrosBusqueda(value: ParamBuscar) {
    this._parametrosBusqueda = value;
  }
  public get resultadosBusqueda(): any[] {
    return this._resultadosBusqueda;
  }
  public set resultadosBusqueda(value: any[]) {
    this._resultadosBusqueda = value;
  }
}
