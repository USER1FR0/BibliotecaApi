import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Evento {
  IdEvento?: number; // Opcional para creación de nuevos eventos
  NombreEvento: string;
  Latitud: number;
  Longitud: number;
  Fecha: string; // Formato de fecha en cadena
  Descripcion: string;
  estatus?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'https://bibliotecaapi-f3gz.onrender.com/eventos'; // URL base de tu API

  constructor(private http: HttpClient) {}

  // Obtener eventos activos (para mostrar en el mapa)
  getEventosActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/mapa`);
  }

  // Obtener todos los eventos
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Obtener un evento por ID
  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/eventos/${id}`);
  }

  // Crear un nuevo evento
  createEvento(evento: Evento): Observable<any> {
    return this.http.post(`${this.apiUrl}/createEvento`, evento);
  }

  // Actualizar un evento existente
  updateEvento(id: number, evento: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateEvento/${id}`, evento);
  }

  // Eliminar un evento por ID
  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteEvento/${id}`);
  }
}
