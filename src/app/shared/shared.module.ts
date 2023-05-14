import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarComponent } from './buscar/buscar.component';
import { RouterModule } from '@angular/router';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [HeaderComponent, BuscarComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbDatepicker
  ],
  exports: [HeaderComponent, BuscarComponent]
})
export class SharedModule { }
