import { Component, OnInit } from '@angular/core';
import { IpService } from './../../../../Services/ip.service';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})

export class ipComponent implements OnInit {
  ipInfo: any;
  lat: number = 0;
  lon: number = 0;

  constructor(private ipService: IpService) {}

  ngOnInit(): void {
    this.getIpInfo();
  }

  // Obtener la información de la IP y luego pasar las coordenadas al componente Map
  getIpInfo() {
    this.ipService.getIpInfo().subscribe(
      (data) => {
        this.ipInfo = data;
        this.lat = data.lat; // Asignar latitud obtenida
        this.lon = data.lon; // Asignar longitud obtenida
      },
      (error) => {
        console.error('Error obteniendo información de la IP:', error);
      }
    );
  }
}
