import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarComponent } from './buscar/buscar.component';
import { RouterModule } from '@angular/router';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PagesModule } from '../pages/pages.module';



@NgModule({
  declarations: [HeaderComponent, BuscarComponent, ResultadoBusquedaComponent, ConfirmComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbDatepicker
  ],
  exports: [HeaderComponent, BuscarComponent, ResultadoBusquedaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
