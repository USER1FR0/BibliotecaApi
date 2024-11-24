import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBooksComponent } from './components/menu/Options/Administrador/search-books/SearchBooks.component';
import { NewBooksComponent } from './components/menu/Options/Administrador/NewBooks/NewBooks.component';
import { EditBooksComponent } from './components/menu/Options/Administrador/EditBooks/EditBooks.component';
import { ConfirmacionDeEmailComponent } from './components/menu/Options/Administrador/confirmacion-de-email/confirmacion-de-email.component';
import { MultasComponent } from './components/menu/Options/Administrador/multas/multas.component';
import { RegistroBibiotecariosModule } from './components/menu/Options/Administrador/RegistroBibliotecarios/bibliotecarios.component';
import { RegistroLectorComponent } from './components/menu/Options/Administrador/Lectores/lectores.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonalisadoComponent } from './components/menu/Options/Administrador/ReportePersonalisado/personalisados.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './components/home/error/error.component';
import { DevolucionDeLibrosComponent } from './components/menu/Options/Administrador/devolucion-de-libros/devolucion-de-libros.component';
import { ipComponent } from './components/menu/Options/Administrador/ip/ip.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapComponent} from './map/map.component';
import { PagarMultasComponent } from './components/menu/Options/Usuario/pagar-multas/pagar-multas.component';
import { ComprarLibrosComponent } from './components/menu/Options/Usuario/comprar-libros/comprar-libros.component'
import { MatDialogModule } from '@angular/material/dialog';
import { EventosComponent } from './components/menu/options/Administrador/eventos/eventos.component';
import { PaypalComponent } from './components/menu/options/usuario/paypal/paypal.component';
import { FbLoginComponent } from './components/home/fb-login/fb-login.component';
import { RouterModule } from '@angular/router';
import { NewsService } from './components/Services/news.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    SearchBooksComponent,
    NewBooksComponent,
    EditBooksComponent,
    ConfirmacionDeEmailComponent,
    MultasComponent,
    RegistroLectorComponent,
    PersonalisadoComponent,
    ErrorComponent,
    DevolucionDeLibrosComponent,
    ipComponent,
    MapComponent,
    PagarMultasComponent,
    ComprarLibrosComponent,
    EventosComponent,
    PaypalComponent,
    FbLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RegistroBibiotecariosModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    RouterModule
  ],
  providers: [
    provideAnimationsAsync(),
    NewsService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
