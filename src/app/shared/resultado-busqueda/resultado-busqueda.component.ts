import { Component, OnInit } from '@angular/core';
import { BuscarService } from 'src/app/services/buscar.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { HabitacionService } from '../../services/habitacion.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { Habitacion } from 'src/app/interfaces/habitacion';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.scss'],
})
export class ResultadoBusquedaComponent implements OnInit {
  constructor(
    private buscarService: BuscarService,
    private hotelService: HotelService,
    private imagenService: ImagenService,
    private habitacionService: HabitacionService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
  }

  get resultadoBusqueda() {
    return this.buscarService.resultadosBusqueda;
  }

  get obtenerDatosCombinados() {
    const datosCombinados: any[] = [];

    this.resultadoBusqueda.forEach((resultado) => {
      const hotelId = resultado.hotel;
      const habitacionId = resultado.habitacion;

      let hotel: Hotel = {
        nombre: '',
        direccion: '',
        ciudad: '',
        descripcion: '',
        servicios: [],
        tieneSello: true,
        imagenes: [],
        puntuacion_resenas: 1,
        estrellas: 1,
      };

      let habitacion: Habitacion = {
        hotel: '',
        num_plazas: 1,
        tipo_cama: '',
        vistas: '',
        imagenes: [],
      };
 
      // obtener datos de la habitacion
      this.habitacionService.obtenerHabitacion(habitacionId).subscribe({
        next: (habitacionData) => {
          habitacion = habitacionData.data;
          console.log('habitacion');
          console.log(habitacion.vistas);
        },
        error: (errorHotelData) => {
          console.error(errorHotelData);
        },
      });
      // Obtener datos del hotel
      this.hotelService.obtenerHotel(hotelId).subscribe({
        next: (hotelData) => {
          hotel = hotelData.data;
          console.log('hotel');
          console.log(hotel.nombre);
        },
        error: (errorHotelData) => {
          console.error(errorHotelData);
        },
      });
     
      const datosCombined = {
        hotel: hotel,
        reserva: resultado,
        habitacion: habitacion,
      };
      datosCombinados.push(datosCombined);
    });
    return datosCombinados;
  }
}
