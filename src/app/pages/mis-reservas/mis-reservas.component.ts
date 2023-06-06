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
  today: Date = new Date()

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
        if(this._reservas.length > 0){
          this._reservas.forEach((reserva: Reserva) => {
            // filtramos las reservas, quitando las pasadas
            this._reservas = this._reservas.filter(r => {
              const fechaCheckout = new Date(r.fechaCheckout);
              return fechaCheckout > this.today;
            })
            this.hotelService.obtenerHotel(reserva.hotel).subscribe({
              next: (hotel) => {
                // cambia el id del hotel por el nombre
                reserva.hotel = hotel.data.nombre;
              },
              error: (err) => {
                console.error('No se pudo obtener el Hotel', err);
              },
            });
        });
        console.log(reservas);
        this.cargadas = true;
        }
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
