import { Component, OnInit } from '@angular/core';
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


  constructor(private buscarService: BuscarService) { }

  ngOnInit() {
    
  }
  buscar() {
    console.log(this.parametrosBusqueda)
    this.buscarService.buscar(this.parametrosBusqueda)
    .subscribe(resp => {
      console.log(resp);
    })
  }

}
