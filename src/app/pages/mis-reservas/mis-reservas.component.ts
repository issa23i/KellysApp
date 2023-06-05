import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/interfaces/hotel';
import { Reserva } from 'src/app/interfaces/reserva';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss'],
})
export class MisReservasComponent implements OnInit {
  private _reservas: Reserva[] = [];
  cargadas: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.cargadas = false;
    this.reservaService.getReservas().subscribe({
      next: (reservas: any) => {
        this._reservas = reservas['data'];
        this._reservas.forEach((reserva: Reserva) => {
          this.hotelService.obtenerHotel(reserva.hotel).subscribe({
            next: (hotel) => {
              reserva.hotel = hotel.data.nombre;
            },
            error: (err) => {
              console.error('No se pudo obtener el Hotel', err);
            },
          });
        });
        console.log(reservas);
        this.cargadas = true;
      },
      error: (error) => {
        console.error('Error al obtener la reservas ', error);
      },
    });
  }

  public get reservas(): Reserva[] {
    return this._reservas;
  }
}
