import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamBuscar } from 'src/app/interfaces/param-buscar';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent  implements OnInit {

  // recoge el nombre del hotel si se encuentra en la ruta hotel
  @Input() nombreHotel: string = '';

  hotel : string = ''; //recogerá de la ruta si existe un id de hotel

  parametrosBusqueda: ParamBuscar = {
    hotel: this.hotel,
    ciudad: '',
    checkIn: new Date(),
    checkOut: new Date(),
    viajeros: 1
  };


  errores = {
    ciudad: '',
    checkIn: '',
    checkOut: '',
    viajeros: ''
  };

  constructor(
    private route: ActivatedRoute, private buscarService: BuscarService) { }

    ngOnInit() {
      this.route.paramMap.subscribe((params) => {
        // Obtener el valor de 'hotel' de la ruta o si no hay id, cadena vacía
        this.hotel = params.get('id') || '';
        this.parametrosBusqueda.hotel = this.hotel; // Actualizar el valor de parametrosBusqueda.hotel
      });
    }
  

  buscar(hotelId : string = '') {
    const fechaActual = new Date();
    const checkIn = new Date(this.parametrosBusqueda.checkIn);
    const checkOut = new Date(this.parametrosBusqueda.checkOut);
    const ciudad = this.parametrosBusqueda.ciudad


    if (!ciudad || !ciudad.trim()) {
      this.errores.ciudad = 'La ciudad es obligatoria';
      return;
    }
    
    if(!checkIn || !checkOut){
      this.errores.checkIn = 'Debe introducir un rango de fechas válido'
      return;
    }

    if (checkIn < fechaActual) {
      this.errores.checkIn = 'Check-In debe ser igual o posterior a la fecha actual.'
      return;
    }

    if (checkOut <= checkIn) {
      this.errores.checkOut = 'Check-Out debe ser igual o posterior a Check-In.'
      return;
    }

    if(!this.parametrosBusqueda.viajeros){
      this.errores.viajeros = 'Debe introducir un número de viajeros comprendido entre 1 y 9, ambos inclusive.'
      return;
    }

    if (this.parametrosBusqueda.viajeros < 1 || this.parametrosBusqueda.viajeros > 9) {
      this.errores.viajeros = 'El número de viajeros debe estar comprendido entre 1 y 9, ambos inclusive.'
      return;
    }

    console.log(this.parametrosBusqueda);

    this.buscarService.parametrosBusqueda = this.parametrosBusqueda
    console.log(this.buscarService.parametrosBusqueda)
    console.log(hotelId)
    this.buscarService.buscar(hotelId)
  }
  

}
