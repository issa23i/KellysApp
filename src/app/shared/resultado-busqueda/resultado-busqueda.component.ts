import { Component, OnInit } from '@angular/core';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.scss'],
})
export class ResultadoBusquedaComponent  implements OnInit {

  constructor(private buscarService: BuscarService) { }

  ngOnInit() {}

  get resultadoBusqueda(){
    return this.buscarService.resultadosBusqueda;
  }
}
