import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paypal',
  template: `<div id="paypal-button-container"></div>`,
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @Input() multa: any;

  ngOnInit(): void {
    this.renderPayPalButton();
  }

  renderPayPalButton() {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        // Crear una orden con el monto de la multa
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.multa.Monto  // Monto de la multa desde la base de datos
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        // Capturar el pago después de la aprobación
        return actions.order.capture().then((details: any) => {
          console.log('Pago completado:', details);
          // Aquí puedes actualizar el estado de la multa a "Pagada"
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
      }
    }).render('#paypal-button-container');  // Renderizar el botón de PayPal
  }
}
