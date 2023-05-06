import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BuscarComponent } from './buscar/buscar.component';



@NgModule({
  declarations: [HeaderComponent, BuscarComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [HeaderComponent, BuscarComponent]
})
export class SharedModule { }
