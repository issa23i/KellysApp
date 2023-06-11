import { Component, AfterViewInit} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements AfterViewInit {
  mapBoxURI: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  map!: mapboxgl.Map;
   // Dirección completa para la geocodificación
    address! : string 

    constructor(private modalController: ModalController) {}

  ngAfterViewInit() {
    mapboxgl.accessToken = environment.mapBoxAccessToken

    this.map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -5.9873888888889, 37.380694444444 ], // url de sevilla para inicializar el mapa
      zoom: 15
    });
    // Llamada a la API de geocodificación de Mapbox para obtener las coordenadas geográficas
    fetch(
      `${this.mapBoxURI}${encodeURIComponent(this.address)}.json?access_token=${mapboxgl.accessToken}`
    )
      .then(response => response.json())
      .then(data => {
        // Extraer las coordenadas de la respuesta de la API
        const [longitude, latitude] = data.features[0].center;

        // Centrar el mapa en las coordenadas obtenidas
        this.map.setCenter([longitude, latitude]);

        // Agregar un marcador en la ubicación obtenida
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(this.map);
      })
      .catch(error => {
        console.error('Error al obtener las coordenadas:', error);
      });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  
}