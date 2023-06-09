import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { ImagenService } from 'src/app/services/imagen.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';

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
    private imagenService: ImagenService,
    private cookieService: CookieService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.getUserLogged();
  }

  ngOnInit(): void {
    this.hotelService.obtenerHoteles().subscribe({
      next: (resp: any) => {
        this._hoteles = resp.data;

        this._hoteles.forEach((hotel) => {
          let images = hotel.imagenes;
          for (let i = 0; i < images.length; i++) {
            this.imagenService.obtenerImagen(hotel.imagenes[i]).subscribe({
              next: (resp: any) => {
                // cambiar la id de mongoDB por la url de la imagen
                hotel.imagenes[i] = resp.data.url;
              },
              error: (error) => {
                console.error('Error obteniendo las imágenes del hotel ' ,error);
              },
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener los hoteles ', err);
      },
    });

    this.router.events.subscribe((event) => {
      // comprobar si se ha producido una navegación
      if (event instanceof NavigationEnd) {
        // si viene de login, dar bienvenida
        let previousUrl = this.cookieService.get('previousUrl');

        if (previousUrl === '/login') {
          let userData = JSON.parse(this.cookieService.get('usuario'));
          let userName = userData.data.user.nombre;
          this.mostrarVentanaEmergente(userName);
          this.cookieService.delete('previousUrl');
        }
      }
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
      return usuario
    } else {// undefined
      return 
    }
  }

  /** sólo recoge el número de estrellas de un hotel y devuelve un array para el bucle */
  getEstrellas(numEstrellas: number) {
    let estrellas: number[] = [];
    for (let i = 0; i < numEstrellas; i++) {
      estrellas.push(i);
    }
    return estrellas;
  }

  // Función para mostrar la ventana emergente de bienvenida
  async mostrarVentanaEmergente(user: string) {
    try {
      const alert = await this.alertController.create({
        header: `¡Bienvenid@, ${user}!`,
        message: '¡Gracias por iniciar sesión!',
        buttons: ['Aceptar'],
      });

      await alert.present();

      // Esperar 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Cerrar la ventana emergente
      await alert.dismiss();
    } catch (error) {
      console.error('Error al mostrar la ventana emergente ', error);
    }
  }
}
