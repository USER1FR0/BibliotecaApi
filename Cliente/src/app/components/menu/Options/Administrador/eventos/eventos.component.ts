import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  Evento = {
    Nombre: '',
    Latitud: '',
    Longitud: '',
    Fecha: '',
    Descripcion: '',
  };
  Events: any[] = [];
  loading: boolean = false;
  searchQuery: string = ''; // Para la barra de búsqueda unificada
  isRegistroVisible: boolean = false;
  isEventosVisible: boolean = false;
  editMode: boolean = false; // Modo de edición
  editEventId: number | null = null; // ID del evento en edición

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadEvents(); 
  }

  showRegistro() {
    this.isRegistroVisible = true;
    this.isEventosVisible = false;
    this.editMode = false; // Desactiva el modo de edición
  }

  showEventos() {
    this.isRegistroVisible = false;
    this.isEventosVisible = true;
  }

  resetView() {
    this.isRegistroVisible = false;
    this.isEventosVisible = false;
    this.editMode = false; // Resetea el modo de edición
    this.Evento = { Nombre: '', Latitud: '', Longitud: '', Fecha: '', Descripcion: '' };
  }

  onSubmit() {
    if (this.editMode) {
      // Actualizar evento existente
      this.http.put(`https://bibliotecaapi-f3gz.onrender.com/eventos/updateEvento/${this.editEventId}`, this.Evento).subscribe(
        () => {
          this.snackBar.open('Evento actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.loadEvents();
          this.resetView(); // Vuelve a la vista inicial
        },
        (error) => {
          this.snackBar.open('Error al actualizar el evento', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      // Crear un nuevo evento
      if (this.Evento.Nombre && this.Evento.Latitud && this.Evento.Longitud && this.Evento.Fecha && this.Evento.Descripcion) {
        this.http.post('https://bibliotecaapi-f3gz.onrender.com/eventos/createEvento', this.Evento).subscribe(
          (response: any) => {
            this.snackBar.open('Evento registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.loadEvents();
            this.resetView();
          },
          (error) => {
            this.snackBar.open('Error al registrar el Evento', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', { duration: 3000 });
      }
    }
  }

  loadEvents() {
    this.loading = true;
    this.http.get<any>('https://bibliotecaapi-f3gz.onrender.com/eventos/eventos')
      .subscribe(
        (data) => {
          this.Events = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error al cargar Eventos:', error);
          this.loading = false;
        }
      );
  }

  filterEvents() {
    return this.Events.filter(event => {
      const query = this.searchQuery.toLowerCase();
      const matchesNombre = event.NombreEvento.toLowerCase().includes(query);
      const matchesDescripcion = event.Descripcion.toLowerCase().includes(query);
      const matchesStatus = event.estatus.toLowerCase().includes(query);
      return matchesNombre || matchesDescripcion || matchesStatus;
    });
  }

  editarEvento(event: any) {
    this.Evento = {
      Nombre: event.NombreEvento,
      Latitud: event.Latitud,
      Longitud: event.Longitud,
      Fecha: event.Fecha,
      Descripcion: event.Descripcion
    };
    this.editMode = true;
    this.editEventId = event.IdEvento;
    this.showRegistro();
  }

  eliminarEvento(id: number) {
    this.http.delete(`https://bibliotecaapi-f3gz.onrender.com/eventos/deleteEvento/${id}`)
      .subscribe(
        () => {
          this.snackBar.open('Evento eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.loadEvents();
        },
        (error) => {
          this.snackBar.open('Error al eliminar el evento', 'Cerrar', { duration: 3000 });
        }
      );
  }
}
