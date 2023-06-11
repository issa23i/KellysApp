import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Hotel } from 'src/app/interfaces/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { ImagenService } from '../../services/imagen.service';
import { Imagen } from 'src/app/interfaces/imagen';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ModalController } from '@ionic/angular';
import { MapboxComponent } from 'src/app/shared/mapbox/mapbox.component';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {


  private _hotel: Hotel = {
    nombre: '',
    direccion: '',
    ciudad: '',
    descripcion: '',
    servicios: [],
    tieneSello: false,
    imagenes: [],
    puntuacion_resenas: 1,
    estrellas: 1,
  };
  private _imagenes: Imagen[] = [];

  private _id: string = '';
  private _cargado: boolean = false;

  constructor(
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
    private imagenService: ImagenService,
    private habitacionService: HabitacionService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this._id = params['id'];
      this.hotel._id = params['id'];
      this.hotelService.obtenerHotel(this._id).subscribe({
        next: (resp) => {
          this.hotel = resp.data;
          console.log(this.hotel);
          this.hotel.imagenes.forEach((idImg) => {
            this.imagenService.obtenerImagen(idImg).subscribe({
              next: (resp) => {
                console.log(resp.data.url);
                this.imagenes.push(resp.data.url);
              },
              error: (err) => {
                console.error('Error al obtener la imagen del hotel ', err);
              },
            });
          });
          this._cargado = true;
        },
        error: (err) => {
          console.error('Error al obtener el hotel ', err);
        },
      });
    });
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

  /** sólo recoge el número de estrellas de un hotel y devuelve un array para el bucle */
  getEstrellas(numEstrellas : number){
    let estrellas : number[] = []
    for (let i = 0; i < numEstrellas; i++) {
      estrellas.push(i)
    }
    return estrellas
  }

  getHabitacion(idHabitacion : string){
    this.habitacionService.obtenerHabitacion(idHabitacion)
    .subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        console.error('Error al obtener la habitación ', err);
      }
    })
  }

  async openMapModal() {
    const modal = await this.modalController.create({
      component: MapboxComponent,
      componentProps: {
        address: this.hotel.direccion
      },
      cssClass: 'map-modal' // Clase CSS opcional para personalizar el estilo del modal
    });
    return await modal.present();
  }
}
