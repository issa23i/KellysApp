import { Component, OnInit } from '@angular/core';
import { BuscarService } from 'src/app/services/buscar.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Router } from '@angular/router';
import { ResultadoBusqueda } from '../../interfaces/resultado-busqueda';
import { error } from 'console';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.scss'],
})
export class ResultadoBusquedaComponent implements OnInit {


  constructor(
    private buscarService: BuscarService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  get resultados(){
    if(this.router.url === '/home'){
      return this.resultadosFiltrados
    } else { // si no está en home, está en /hotel
      return this.resultadoBusqueda
    }
  }
  
  get resultadoBusqueda () {
    let resultados = this.buscarService.resultadosBusqueda;
    
    return resultados;
  }
  
  /**
   * devolver sólo una habitación por hotel (la más barata)
   */
  get resultadosFiltrados(){
    let resultados = this.resultadoBusqueda

    // Crear un mapa para almacenar los objetos únicos con hotelId como clave
    const mapaResultados = new Map();

    // Iterar sobre los resultados y mantener solo el objeto con precioTotal más bajo por hotelId
    for (const obj of resultados) {
      const { hotelId, precioTotal } = obj;
      
      // Si hotelId ya existe en el mapa, comprobar si el precioTotal es más bajo
      if (mapaResultados.has(hotelId)) {
        const objetoExistente = mapaResultados.get(hotelId);
        
        // Si el precioTotal es más bajo, reemplazar el objeto existente en el mapa
        if (precioTotal < objetoExistente.precioTotal) {
          mapaResultados.set(hotelId, obj);
        }
      } else {
        // Si hotelId no existe en el mapa, agregar el objeto al mapa
        mapaResultados.set(hotelId, obj);
      }
    }

    // Obtener los valores del mapa como un array de objetos únicos con hotelId
    const resultadosFiltrados = Array.from(mapaResultados.values());

    return resultadosFiltrados
  }

  reservar(resultadoBusqueda: ResultadoBusqueda){
    if(this.reservaService.newReserva(resultadoBusqueda)){
      console.log(this.reservaService.reserva)
      this.reservaService.setReserva()
        .subscribe({
          next: (data) => {
            // ir a la página de la reserva
            console.log(data['data']._id)
            console.log(data)
            this.router.navigateByUrl(`/reserva/${data['data']._id}`);

          },
          error: (err) => {
            console.error(err)
          }
        })
    } else {

    }
  }
}
