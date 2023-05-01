import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { PorQueComponent } from './por-que/por-que.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    HotelComponent,
    LoginComponent,
    MiPerfilComponent,
    MisReservasComponent,
    PorQueComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }