import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Hotel } from 'src/app/interfaces/hotel';
import { Imagen } from 'src/app/interfaces/imagen';
import { HotelService } from 'src/app/services/hotel.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UrlTree } from '@angular/router';
import { ImagenModalComponent } from 'src/app/shared/imagen-modal/imagen-modal.component';

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
  imagenFile!: File;
  imagen : Imagen = {}

  hoteles: Hotel[] = [];
  imagenes: Imagen[] = [];

  hayHoteles: boolean = false
  hayImagenes: boolean = false

  errorImagen: boolean = false

  constructor(
    private hotelService: HotelService,
    private imagenService: ImagenService,
    private alertController: AlertController,
    private modalController: ModalController
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

  abrirFormHotel(){
    this.hayHoteles = false
  }
  
  abrirFormImagen(){
    this.hayImagenes = false
  }
  addHotel() {
    this.hotelService.addHotel(this.hotel).subscribe({
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


  onImageSelected(event: any){
    if (event.target.files && event.target.files.length > 0) {
      this.imagenFile = event.target.files[0];
    } else {
      console.error('No se ha cargado la imagen en el formulario')
    }
  }

  addImagen() {
    this.errorImagen = false
    console.log('subir imagen')
    this.imagenService.subirImagen(this.imagenFile).subscribe({
      next: (resp) => {
        console.log(resp)
        this.imagen._id = resp.data._id
        this.imagen.url = resp.data.url
        this.imagen.filename = resp.data.filename
        this.presentAlertCreateImagen(this.imagen._id || 'No especificada')
      },
      error: (e) => {
        console.error('No se pudo completar la subida del archivo ', e)
        this.errorImagen = true
      }
    })
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
      buttons: [{
        text: 'OK',
        handler: () => {// Recargar la página al cerrar el alert
          window.location.reload(); 
        }
      }]
    });
  
    await alert.present();
  }

  async presentAlertCreateImagen(imagenId: string) {
    const alert = await this.alertController.create({
      header: 'Imagen subida',
      message: 'El ID de la imagen subida es: ' + imagenId,
      buttons: [{
        text: 'OK',
        handler: () => {// Recargar la página al cerrar el alert
          window.location.reload(); 
        }
      }]
    });
  
    await alert.present();
  }

  async presentAlertDeleteHotel() {
    const alert = await this.alertController.create({
      header: 'Hotel Eliminado',
      message: 'El Hotel se ha eliminado con éxito.',
      buttons: [{
        text: 'OK',
        handler: () => {// Recargar la página al cerrar el alert
          window.location.reload(); 
        }
      }]
    });
    await alert.present();
  }

  async presentAlertDeleteImagen() {
    const alert = await this.alertController.create({
      header: 'Imagen eliminada',
    message: 'La imagen ha sido eliminada con éxito.',
    buttons: [
      {
        text: 'OK',
        handler: () => {// Recargar la página al cerrar el alert
          window.location.reload(); 
        }
      }
    ]
  });

  await alert.present();
  }
  
  limpiarCamposHotel() {
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

  eliminarHotel(idHotel : string = ''){
    if(idHotel){
      this.hotelService.deleteHotel(idHotel).subscribe({
        next: (response) => {
          this.presentAlertDeleteHotel()
          console.log(response)
        },
        error: (error) => {
          console.log('No se pudo eliminar el hotel ', error)
        }
      })
      
    }
  }

  eliminarImagen(idImagen : string = ''){
    if(idImagen){
      this.imagenService.deleteImagen(idImagen).subscribe({
        next: (response) => {
          this.presentAlertDeleteImagen()
          console.log(response)
        },
        error: (error) => {
          console.log('No se pudo eliminar la imagen ', error)
        }
      })
      
    }
  }

  async abrirModalImagen(imagenUrl: string ) {
    const modal = await this.modalController.create({
      component: ImagenModalComponent,
      componentProps: {
        imagenUrl: imagenUrl,
      },
    });
  
    return await modal.present();
  }
  

}
