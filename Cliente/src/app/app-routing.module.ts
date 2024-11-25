import { RegistroBibiotecariosComponent } from './components/menu/Options/Administrador/RegistroBibliotecarios/bibliotecarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import {SearchBooksComponent} from './components/menu/Options/Administrador/search-books/SearchBooks.component'
import { NewBooksComponent } from './components/menu/Options/Administrador/NewBooks/NewBooks.component';
import { MaterialModule } from './material/material.module';
import { EditBooksComponent } from './components/menu/Options/Administrador/EditBooks/EditBooks.component';
import { MultasComponent } from './components/menu/Options/Administrador/multas/multas.component';
import { RegistroLectorComponent } from './components/menu/Options/Administrador/Lectores/lectores.component';
import { PersonalisadoComponent } from './components/menu/Options/Administrador/ReportePersonalisado/personalisados.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './components/home/error/error.component';
import { ipComponent } from './components/menu/Options/Administrador/ip/ip.component';
import { MapComponent } from './map/map.component';
import { FbLoginComponent } from './components/home/fb-login/fb-login.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent}, 
  { path: 'error', component: ErrorComponent },
  {path:'login',component:LoginComponent,canActivate: [AuthGuard]},
  {path: 'search', component: SearchBooksComponent, canActivate: [AuthGuard] },
  {path: 'NewBook', component: NewBooksComponent, canActivate: [AuthGuard] },
  { path: 'new-book', component: NewBooksComponent, canActivate: [AuthGuard]  },
  {path: 'EditBook', component:EditBooksComponent, canActivate: [AuthGuard] },
  {path: 'multas', component: MultasComponent, canActivate: [AuthGuard] },
  {path: 'registro', component: RegistroBibiotecariosComponent, canActivate: [AuthGuard] },
  {path: 'lector', component: RegistroLectorComponent, canActivate: [AuthGuard] },
  {path: 'personalizado', component: PersonalisadoComponent, canActivate: [AuthGuard] },
  {path: 'ip', component: ipComponent},
  {path: 'mapa', component: MapComponent},
  {path: 'fbLogin', component: FbLoginComponent},
  { path: '**', redirectTo: '/home' } // Redirige cualquier ruta no definida a /home

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MaterialModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }