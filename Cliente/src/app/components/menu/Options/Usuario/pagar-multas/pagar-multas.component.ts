import { Component, OnInit } from '@angular/core';
import { MultasService } from '../../Services/multa.service';

@Component({
  selector: 'app-pagar-multas',
  templateUrl: './pagar-multas.component.html',
  styleUrl: './pagar-multas.component.css'
})
export class PagarMultasComponent implements OnInit {
  multasPendientes: any[] = [];
  numeroControlInput: string | null = null;
  multaSeleccionada: any | null = null;  // Nueva variable para almacenar la multa seleccionada
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(private multasService: MultasService) { }

  ngOnInit(): void { }

  loadMultasPendientes(): void {
    if (!this.numeroControlInput) return;

    this.multasService.getMultas().subscribe({
      next: (data) => {
        this.multasPendientes = data.filter((multa: any) =>
          multa.NumeroControl === this.numeroControlInput && multa.Estatus === 'Activa'
        );
      },
      error: error => {
        console.error('Error al cargar las multas:', error);
      }
    });
  }

  pagarMulta(multa: any): void {
    this.multaSeleccionada = multa;  // Guardar la multa seleccionada
  }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }
}
