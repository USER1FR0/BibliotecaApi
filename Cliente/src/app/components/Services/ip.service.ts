import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  // URL para obtener la IP pública
  private ipifyUrl = 'https://api.ipify.org?format=json'; 
  // URL para obtener la información de la IP desde IpApi
  private ipApiUrl = 'http://ip-api.com/json/'; 

  constructor(private http: HttpClient) {}

  // Método para obtener la información de la ubicación basada en la IP
  getIpInfo(): Observable<any> {
    return this.getPublicIp().pipe(
      switchMap((response: any) => {
        const publicIp = response.ip;
        // Se usa la IP pública obtenida para hacer la solicitud a IpApi
        return this.http.get<any>(`${this.ipApiUrl}${publicIp}`);
      })
    );
  }

  // Método para obtener la IP pública usando el servicio ipify
  private getPublicIp(): Observable<any> {
    return this.http.get<any>(this.ipifyUrl);
  }
}
