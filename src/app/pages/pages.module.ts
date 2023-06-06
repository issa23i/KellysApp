import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { PorQueComponent } from './por-que/por-que.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { BuscarComponent } from '../shared/buscar/buscar.component';
import { RouterModule } from '@angular/router';
import { ReservaComponent } from './reserva/reserva.component';
import { InicioSesionComponent } from '../shared/inicio-sesion/inicio-sesion.component';



@NgModule({
    declarations: [
        HomeComponent,
        HotelComponent,
        LoginComponent,
        MiPerfilComponent,
        MisReservasComponent,
        PorQueComponent,
        RegisterComponent,
        ReservaComponent,
        InicioSesionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule
    ], 
    
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
