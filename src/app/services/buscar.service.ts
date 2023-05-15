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


  buscar(): Observable<any>{
  
  
    this.http.post<any>(this._apiUrlBuscar, this.parametrosBusqueda)
    .subscribe({
      next: (resp : ResultadoBusqueda[]) => {
        this._resultadosBusqueda = resp
        console.log(resp);
      },
      error: err => {
        console.error(err, err.message);
      }
    });
    return this.http.post<any>(this._apiUrlBuscar, this.parametrosBusqueda);
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
