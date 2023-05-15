import { Component, OnInit } from '@angular/core';
import { BuscarService } from 'src/app/services/buscar.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { HabitacionService } from '../../services/habitacion.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.scss'],
})
export class ResultadoBusquedaComponent implements OnInit {

  datosCombinados: any[] = [];

  constructor(
    private buscarService: BuscarService,
    private hotelService: HotelService,
    private imagenService: ImagenService,
    private habitacionService : HabitacionService,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.getDatosCombinados();
  }


  get resultadoBusqueda() {
    return this.buscarService.resultadosBusqueda;
  }

  getDatosCombinados(): void {
    this.resultadoBusqueda.forEach((reserva) => {
      const hotelId = reserva.hotel;
      const habitacionId = reserva.habitacion;

      // Obtener datos del hotel
      this.hotelService.obtenerHotel(hotelId).subscribe((hotelData) => {
          // Obtener datos de la habitación
          this.habitacionService.obtenerHabitacion(habitacionId).subscribe((habitacionData) => {
            const datosCombinados = {
              hotel: hotelData,
              reserva: reserva,
              habitacion: habitacionData
            };
            this.datosCombinados.push(datosCombinados);
          });
        });
      });
  }

}
