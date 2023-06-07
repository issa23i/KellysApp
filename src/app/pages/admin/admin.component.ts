import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Hotel } from 'src/app/interfaces/hotel';
import { Imagen } from 'src/app/interfaces/imagen';
import { HotelService } from 'src/app/services/hotel.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  hotel: Hotel = {
    nombre: '',
    direccion: '',
    ciudad: '',
    descripcion: '',
    servicios: [],
    tieneSello: false,
    imagenes: [],
    estrellas: 0
  };
  imagen: Imagen = {
    url: '',
    filename: ''
  }

  hoteles: Hotel[] = [];
  imagenes: Imagen[] = [];

  hayHoteles: boolean = false
  hayImagenes: boolean = false

  constructor(
    private hotelService: HotelService,
    private imagenService: ImagenService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.hayHoteles = false
    this.hayImagenes = false
    this.hotelService.obtenerHoteles().subscribe({
      next: (htles) => {
        console.log(htles.data)
        this.hoteles = htles.data;
        this.hayHoteles = true
      },
      error: (e) => {
        console.log('Error al obtener los hoteles', e);
      },
    });

    this.imagenService.obtenerImagenes().subscribe({
      next: (imgs) => {
        console.log(imgs.data)
        this.imagenes = imgs.data;
        this.hayImagenes = true
      },
      error: (e) => {
        console.log( 'Error al obtener las imágenes' ,e);
      },
    });

  }
  abrirForm(){
    this.hayHoteles = false
  }
  
  async addHotel() {
    await this.hotelService.addHotel(this.hotel).subscribe({
      next: (htl) => {
        // Manejar la respuesta del servidor, como mostrar un mensaje de éxito, limpiar el formulario, etc.
        console.log('Hotel agregado:', htl);
        this.presentAlertCreateHotel(htl.data._id);
      },
      error: (e) => {
        console.error('No se pudo añadir el hotel ', e)
      }
    });
  }

  addImagen() {
    console.log('añadir imagen');
  }

  async parseServicios(value: string) {
    this.hotel.servicios = value.split(',').map(servicio => servicio.trim());
  }

  async parseImagenes(value: string) {
    this.hotel.imagenes = value.split(',').map(servicio => servicio.trim());
  }

  async presentAlertCreateHotel(hotelId: string) {
    const alert = await this.alertController.create({
      header: 'Hotel Agregado',
      message: 'El ID del hotel agregado es: ' + hotelId,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlertDeleteHotel() {
    const alert = await this.alertController.create({
      header: 'Hotel Eliminado',
      message: 'El Hotel se ha eliminado con éxito.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  limpiarCampos() {
    this.hotel = {
      nombre: '',
      direccion: '',
      ciudad: '',
      descripcion: '',
      servicios: [],
      tieneSello: false,
      imagenes: [],
      puntuacion_resenas: 0,
      estrellas: 0
    };
  }

  async eliminarHotel(idHotel : string = ''){
    if(idHotel){
      this.hotelService.deleteHotel(idHotel).subscribe({
        next: (response) => {
          this.presentAlertDeleteHotel()
        },
        error: (error) => {}
      })
    }
  }
}
