import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParamBuscar } from 'src/app/interfaces/param-buscar';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent  implements OnInit {

  parametrosBusqueda: ParamBuscar = {
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

  constructor(private buscarService: BuscarService) { }

  ngOnInit() {
    
  }
  buscar() {
    const fechaActual = new Date();
    const checkIn = new Date(this.parametrosBusqueda.checkIn);
    const checkOut = new Date(this.parametrosBusqueda.checkOut);

    if (!this.parametrosBusqueda.ciudad.trim()) {
      this.errores.ciudad = 'La ciudad es obligatoria';
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

    if (this.parametrosBusqueda.viajeros < 1 || this.parametrosBusqueda.viajeros > 9) {
      this.errores.viajeros = 'El número de viajeros debe estar comprendido entre 1 y 9, ambos inclusive.'
      return;
    }

    console.log(this.parametrosBusqueda);

    this.buscarService.parametrosBusqueda = this.parametrosBusqueda
    this.buscarService.buscar()
      .subscribe({
        next: resp => {
          console.log(resp);
        },
        error: err => {
          console.error(err, err.message);
        }
      });
  }
  

}
