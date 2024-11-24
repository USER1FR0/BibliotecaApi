import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IpService } from './../Services/ip.service';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { NewsService } from '../Services/news.service';
declare var FB: any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showSearch = false;
  showNewBooks = false;
  showMultas = false;
  showRegistro = false;
  showLectores = false;
  showReporte = false;
  ipInfo: any; 
  showFbLogin = false;  
  news: any[] = []; 

  constructor(private modal: NgbModal, private ipService: IpService, private router: Router,
              private newsService: NewsService) {}
  

  ngOnInit(): void {

    // Llamar a la API cuando se inicie el componente y asignar la respuesta a 'news'
    this.newsService.getTopHeadlines().subscribe(
      (data) => {
        this.news = data.articles;  // Suponiendo que 'articles' es el array en la respuesta
      },
      (error) => {
        console.error('Error al cargar las noticias', error);
      }
    );

    // Obtenemos la información de la IP mediante el servicio IpService
    this.ipService.getIpInfo().subscribe(
      data => {
        this.ipInfo = data;
      },
      error => {
        console.error('Error fetching IP info:', error);
      }
    );
  }

  openModal() {
    const modalRef = this.modal.open(LoginComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true
    });
  }

  
  // Función para manejar el login con Facebook
  fbLogin(): void {
    FB.login((response: any) => {
      if (response.status === 'connected') {
        console.log('Successfully logged in with Facebook!');
        // Realiza las acciones necesarias después del login, como obtener la información del usuario
        FB.api('/me', (userInfo: any) => {
          console.log('User Info:', userInfo);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  // Función para alternar la visibilidad del botón de login de Facebook
  toggleFbLogin(): void {
    this.showFbLogin = !this.showFbLogin;
  }
}
