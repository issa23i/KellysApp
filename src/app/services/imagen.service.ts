import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imagen } from '../interfaces/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  
  private _apiUrlImagenes : string = `${environment.apiUrl}/imagenes`;
  private _apiUrlImagen : string = ''
  
 /**
  * Petición http que devuelve un listado de imágenes o error
  * @param http HttpClient
  */
  constructor(private http: HttpClient) { }


  obtenerImagen (imagenId : string){
     this._apiUrlImagen = `${this._apiUrlImagenes}/${imagenId}`
    return this.http.get<any>(this._apiUrlImagen)
  }

  obtenerImagenes (){
    this._apiUrlImagen = `${this._apiUrlImagenes}`
    return this.http.get<any>(this._apiUrlImagen)
  }

  deleteImagen(imagenId : string){
    this._apiUrlImagen = `${this._apiUrlImagenes}/${imagenId}`
    return this.http.delete<any>(this._apiUrlImagen)
  }

  subirImagen(imagen : File){
    console.log(imagen)
    const formData = new FormData();
    formData.append('myfile', imagen);
    this._apiUrlImagen = `${this._apiUrlImagenes}`
    return this.http.post<any>(this._apiUrlImagen, formData)
  }
}
