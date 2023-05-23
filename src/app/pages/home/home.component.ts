import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _hoteles: Hotel[] = [];
  private _imagenes: string[] = [];

  constructor(
    public auth: AuthService,
    private hotelService: HotelService,
    private imagenService: ImagenService
  ) {
    this.getUserLogged();
  }

  ngOnInit(): void {
    this.hotelService.obtenerHoteles().subscribe({
      next: (resp: any) => {
        this._hoteles = resp.data;

        this._hoteles.forEach((hotel) => {

          let images = hotel.imagenes
          for (let i = 0; i < images.length; i++) {
            
            this.imagenService.obtenerImagen(hotel.imagenes[i])
            .subscribe((resp: any) => {
              // cambiar la id de mongoDB por la url de la imagen
              hotel.imagenes[i] = resp.data.url
            })
            
          }
        });
      },
      error: (err) => {
        console.error(err, err.message);
      },
    });
  }

  public set hoteles(value: Hotel[]) {
    this._hoteles = value;
  }
  public get hoteles(): Hotel[] {
    return this._hoteles;
  }
  public get imagenes(): string[] {
    return this._imagenes;
  }
  public set imagenes(value: string[]) {
    this._imagenes = value;
  }
  getUserLogged() {
    if (this.auth.getUsuario()) {
      let usuario: Usuario = this.auth.getUsuario();
      console.log(usuario.data.user.nombre);
    } else {
      console.log('No hay usuario logado');
    }
  }

  /** sólo recoge el número de estrellas de un hotel y devuelve un array para el bucle */
  getEstrellas(numEstrellas : number){
    let estrellas : number[] = []
    for (let i = 0; i < numEstrellas; i++) {
      estrellas.push(i)
    }
    return estrellas
  }
  
}
