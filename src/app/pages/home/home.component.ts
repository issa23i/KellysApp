import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { ImagenService } from 'src/app/services/imagen.service';
import { BuscarComponent } from 'src/app/shared/buscar/buscar.component';

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
          // obtener la primera imagen de cada hotel
          this.imagenService
            .obtenerImagen(hotel.imagenes[0])
            .subscribe((resp) => {
              console.log(resp.data.url);
              this._imagenes.push(resp.data.url);
            });
        });
      },
      error: (err) => {
        console.error(err, err.message, err.trace);
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
}
