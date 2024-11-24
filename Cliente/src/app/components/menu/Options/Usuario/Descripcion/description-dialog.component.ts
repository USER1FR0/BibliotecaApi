import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-dialog',
  template: `
    <h2>Descripción del Libro</h2>
    <p>{{ data.description }}</p>
    <button mat-button (click)="close()">Cerrar</button>
  `
})
export class DescriptionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }) { }

  close() {
    // Puedes cerrar el modal directamente con la instancia de dialog
  }
}
