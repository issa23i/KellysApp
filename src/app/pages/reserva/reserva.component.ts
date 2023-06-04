import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/interfaces/hotel';
import { Reserva } from 'src/app/interfaces/reserva';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from 'src/app/services/hotel.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  private _reserva: Reserva = {
    _id: '',
    cliente: '',
    hotel: '',
    fechaCheckin: new Date(),
    fechaCheckout: new Date(),
    numPlazas: 0,
    habitacion: '',
    aceptada: false,
    precioTotal: 0,
  };

  hotel!: Hotel;
  private _id: string = '';
  private _cargado: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reservaService: ReservaService,
    private authService: AuthService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this._id = params['id'];
      if (this._id) {
        this.reservaService.getReserva(this._id).subscribe({
          next: (data) => {
            this._reserva = data['reserva'];

            // obtener los datos del hotel 
            this.obtenerHotel(this._reserva.hotel)

          },
          error: ( error) => {
            console.error('Error al obtener la reserva ', error);
          },
        });
      }
    });
  }

  private obtenerHotel(id:string){
    this.hotelService.obtenerHotel(id).subscribe({
      next: (resp) => {
        this.hotel = resp.data;
        this._cargado = true;
      },
      error: (error) => {
        console.error('Error al obtener el hotel ',error);
      },
    });
  }

  public get reserva(): Reserva {
    return this._reserva;
  }

  public get cargado(): boolean {
    return this._cargado;
  }
}
