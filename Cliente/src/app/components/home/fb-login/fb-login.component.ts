import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var FB: any;

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {
  userName: string | null = null;
  userProfilePic: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    FB.getLoginStatus((response: any) => this.statusChangeCallback(response));
  }

  private statusChangeCallback(response: any): void {
    if (response.status === 'connected') {
      this.fetchUserData();
    } else {
      console.log('User not authenticated');
    }
  }

  private fetchUserData(): void {
    FB.api('/me', { fields: 'name, picture' }, (response: any) => {
      this.userName = response.name;
      this.userProfilePic = response.picture.data.url;

      localStorage.setItem('fbLoggedIn', 'true');

      this.router.navigate(['/user-menu']);
    });
  }

  fbLogin(): void {
    FB.login((response: any) => this.statusChangeCallback(response), { scope: 'public_profile,email' });
       
  }
}
