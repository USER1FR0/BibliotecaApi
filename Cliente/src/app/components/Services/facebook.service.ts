import { Injectable } from '@angular/core';

declare var FB: any; // Declara la variable FB para usar el SDK de Facebook

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  constructor() { }

  // Inicia sesión con Facebook
  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information....');
          FB.api('/me', { fields: 'name,email' }, (userData: any) => {
            resolve(userData);
          });
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'public_profile,email' });
    });
  }

  // Obtener el estado de login del usuario
  getLoginStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          resolve(response.authResponse);
        } else {
          reject('User is not logged in');
        }
      });
    });
  }

  // Cerrar sesión de Facebook
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        if (response.status === 'unknown') {
          resolve('Logged out successfully');
        } else {
          reject('Error logging out');
        }
      });
    });
  }
}
