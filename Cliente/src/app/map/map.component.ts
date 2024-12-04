import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventosService } from './../components/Services/eventos.service';
import { environment } from '../components/home/enviroments/enviroment';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: any;
  private platform: any;
  private userPosition: any;
  private currentBubble: any;
  private userMarker: any;
  private mapObjects: any[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    // Asegurarse de que el SDK de HERE está cargado
    if (typeof H !== 'undefined') {
      this.initMap();
    } else {
      console.error('HERE Maps SDK no está cargado');
    }
  }

  ngOnDestroy(): void {
    // Limpieza al destruir el componente
    if (this.map) {
      this.map.dispose();
    }
    this.mapObjects.forEach(obj => {
      if (obj && typeof obj.dispose === 'function') {
        obj.dispose();
      }
    });
  }

  initMap(): void {
    try {
      this.platform = new H.service.Platform({
        apikey: environment.hereApiKey
      });
      
      const defaultLayers = this.platform.createDefaultLayers();

      // Crear el mapa solo si el contenedor existe
      const mapContainer = document.getElementById('mapContainer');
      if (!mapContainer) {
        console.error('Contenedor del mapa no encontrado');
        return;
      }

      this.map = new H.Map(
        mapContainer,
        defaultLayers.vector.normal.map,
        {
          zoom: 12,
          pixelRatio: window.devicePixelRatio || 1
        }
      );

      // Hacer el mapa interactivo
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      const ui = H.ui.UI.createDefault(this.map, defaultLayers, 'es-ES');
      
      // Adaptar el mapa al cambio de tamaño de la ventana
      window.addEventListener('resize', () => {
        this.map.getViewPort().resize();
      });

      this.getBrowserPosition();
      this.loadEventos();
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }

  getBrowserPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (this.map) {
            this.map.setCenter(this.userPosition);
            this.addUserMarker(this.userPosition);
            this.addUserAccuracyCircle(this.userPosition, position.coords.accuracy);
          }
        },
        (error) => {
          console.error('Error de geolocalización:', error);
          alert("No pudimos obtener su ubicación.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation no es soportada por este navegador.");
    }
  }

  addUserMarker(position: any): void {
    if (this.userMarker) {
      this.map.removeObject(this.userMarker);
    }

    const userIcon = new H.map.Icon(
      'https://upload.wikimedia.org/wikipedia/commons/e/e4/Red_dot.svg',
      { size: { w: 32, h: 32 } }
    );
    
    this.userMarker = new H.map.Marker(position, { icon: userIcon });
    this.map.addObject(this.userMarker);
    this.mapObjects.push(this.userMarker);
  }

  addUserAccuracyCircle(position: any, accuracy: number): void {
    const circle = new H.map.Circle(position, accuracy, {
      style: {
        fillColor: 'rgba(0, 128, 255, 0.3)',
        strokeColor: 'rgba(0, 128, 255, 0.8)',
        lineWidth: 2
      }
    });
    this.map.addObject(circle);
    this.mapObjects.push(circle);
  }

  loadEventos(): void {
    this.eventosService.getEventosActivos().subscribe({
      next: (eventos) => {
        eventos.forEach((evento) => {
          const coordinate = { 
            lat: parseFloat(evento.Latitud.toString()),
            lng: parseFloat(evento.Longitud.toString()) 
          };
          this.addTextMarker(coordinate, evento.NombreEvento, evento.Descripcion, this.formatDate(evento.Fecha));
        });
      },
      error: (error) => {
        console.error("Error al cargar eventos:", error);
      }
    });
  }

  formatDate(date: string): string {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("es-ES", { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  addTextMarker(coordinate: any, title: string, description: string, formattedDate: string): void {
    const smallContent = `<b>${title}</b>`;
    const fullContent = `<b>${title}</b><br>${description}<br><i>Fecha: ${formattedDate}</i>`;

    const marker = new H.map.DomMarker(coordinate, {
      icon: this.createTextIcon(smallContent)
    });
    
    this.map.addObject(marker);
    this.mapObjects.push(marker);

    marker.addEventListener('tap', () => {
      marker.setIcon(this.createTextIcon(fullContent));
    });

    marker.addEventListener('pointerleave', () => {
      marker.setIcon(this.createTextIcon(smallContent));
    });
  }

  createTextIcon(content: string): any {
    const div = document.createElement('div');
    div.style.fontSize = '14px';
    div.style.padding = '8px';
    div.style.borderRadius = '8px';
    div.style.backgroundColor = 'blue';
    div.style.color = 'white';
    div.style.border = '1px solid #ddd';
    div.style.maxWidth = '200px';
    div.style.cursor = 'pointer';
    div.style.textAlign = 'center';
    div.innerHTML = content;

    return new H.map.DomIcon(div);
  }
}