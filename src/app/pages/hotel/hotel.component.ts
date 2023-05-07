import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Hotel } from 'src/app/interfaces/hotel';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent  implements OnInit {
  
  private hotel : Hotel ={
    nombre: '',
    direccion: '',
    ciudad: '',
    descripcion: '',
    servicios: [],
    tieneSello: false,
    imagenes: [],
    puntuacion_resenas: 1,
    estrellas: 1
  }
  private _id: string = '';
  private _cargado : boolean = false
  

  constructor(private hotelService: HotelService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id'])
      this._id = params['id']
      this.hotel._id = params['id']
      this.hotelService.obtenerHotel(this._id)
      .subscribe((resp) => {
        this.hotel = resp.data
        this._cargado = true
        console.log(this.hotel)
      })
    })

  
  }
}
