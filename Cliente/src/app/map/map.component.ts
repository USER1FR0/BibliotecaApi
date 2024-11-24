import { Component, OnInit } from '@angular/core';
declare var H: any; // Declaración para evitar errores con H

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private destination = { lat: 21.161237760957135, lng: -100.92707705343682 }; // Ubicación fija de destino

  ngOnInit(): void {
    this.initMap(); // Llama a la función que inicializa el mapa
  }

  initMap(): void {
    const platform = new H.service.Platform({
      apikey: "EA1yweP2Qasi_jTOqeiKhRoBDqnu_Oh_QKiG91e2d38"
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        zoom: 12,
        center: this.destination // Centra el mapa en la ubicación de destino
      }
    );

    const mapEvents = new H.mapevents.MapEvents(map);
    const behavior = new H.mapevents.Behavior(mapEvents);
    const ui = H.ui.UI.createDefault(map, defaultLayers, "es-ES");

    this.getBrowserPosition(map); // Obtiene la posición actual del navegador
    this.addDestinationMarker(map); // Agrega el marcador de la ubicación fija
    this.calculateRoute(platform, map); // Calcula la ruta desde la ubicación actual hacia la ubicación fija
  }

  getBrowserPosition(map: any): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const browserPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Cambiar el marcador del usuario a color rojo
        const userMarker = new H.map.Marker(browserPosition, {
          icon: new H.map.Icon('https://upload.wikimedia.org/wikipedia/commons/e/e4/Red_dot.svg', { size: { w: 32, h: 32 } }) // Marcador rojo
        });
        map.addObject(userMarker);
        map.setCenter(browserPosition); // Centra el mapa en la ubicación del usuario
      }, () => {
        alert("No pudimos obtener su ubicación.");
      });
    } else {
      alert("Geolocation no es soportada por este navegador.");
    }
  }

  addDestinationMarker(map: any): void {
    // Cambiar el marcador de destino a color azul
    const destinationMarker = new H.map.Marker(this.destination, {
      icon: new H.map.Icon('https://upload.wikimedia.org/wikipedia/commons/a/a5/Blue_dot.svg', { size: { w: 32, h: 32 } }) // Marcador azul
    });
    map.addObject(destinationMarker);
  }

  calculateRoute(platform: any, map: any): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const routingParameters = {
          routingMode: "fast",
          transportMode: "car",
          origin: origin.lat + ',' + origin.lng, // Ubicación actual del usuario
          destination: this.destination.lat + ',' + this.destination.lng, // Ubicación fija de destino
          return: "polyline"
        };

        const router = platform.getRoutingService(null, 8);
        router.calculateRoute(routingParameters, (result: any) => {
          if (result.routes.length) {
            const route = result.routes[0];
            route.sections.forEach((section: any) => {
              const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
              const routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: "#034F84", lineWidth: 3 }
              });

              const startMarker = new H.map.Marker(origin, {
                icon: new H.map.Icon('https://upload.wikimedia.org/wikipedia/commons/e/e4/Red_dot.svg', { size: { w: 32, h: 32 } }) // Marcador rojo para el inicio
              });

              const endMarker = new H.map.Marker(this.destination, {
                icon: new H.map.Icon('https://upload.wikimedia.org/wikipedia/commons/a/a5/Blue_dot.svg', { size: { w: 32, h: 32 } }) // Marcador azul para el destino
              });

              map.addObjects([routeLine, startMarker, endMarker]);
              map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
            });
          }
        }, (error: any) => {
          alert("Error al calcular la ruta: " + error.message);
        });
      }, () => {
        alert("No pudimos obtener su ubicación para calcular la ruta.");
      });
    } else {
      alert("Geolocation no es soportada por este navegador.");
    }
  }
}
