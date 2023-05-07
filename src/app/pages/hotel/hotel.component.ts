import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Hotel } from 'src/app/interfaces/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { ImagenService } from '../../services/imagen.service';
import { Imagen } from 'src/app/interfaces/imagen';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent  implements OnInit {
  
  private _hotel: Hotel = {
    nombre: '',
    direccion: '',
    ciudad: '',
    descripcion: '',
    servicios: [],
    tieneSello: false,
    imagenes: [],
    puntuacion_resenas: 1,
    estrellas: 1
  };
  private _imagenes: Imagen[] = [];
  
  private _id: string = '';
  private _cargado: boolean = false;
 
  

  constructor(private hotelService: HotelService 
    , private activatedRoute: ActivatedRoute
    , private imagenService: ImagenService
    ) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id'])
      this._id = params['id']
      this.hotel._id = params['id']
      this.hotelService.obtenerHotel(this._id)
      .subscribe((resp) => {
        this.hotel = resp.data
        console.log(this.hotel)
        this.hotel.imagenes.forEach((idImg) => {
          this.imagenService.obtenerImagen(idImg)
          .subscribe((resp)=> {
            console.log(resp.data.url)
            this.imagenes.push(resp.data.url)
          })
        })
        this._cargado = true
      })
    })

  
  }

  public get hotel(): Hotel {
    return this._hotel;
  }
  public set hotel(value: Hotel) {
    this._hotel = value;
  }
  public get cargado(): boolean {
    return this._cargado;
  }
  public set cargado(value: boolean) {
    this._cargado = value;
  }
  public get imagenes(): Imagen[] {
    return this._imagenes;
  }
  public set imagenes(value: Imagen[]) {
    this._imagenes = value;
  }
}
