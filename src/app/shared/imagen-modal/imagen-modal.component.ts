import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imagen-modal',
  templateUrl: './imagen-modal.component.html',
  styleUrls: ['./imagen-modal.component.scss'],
})
export class ImagenModalComponent  implements OnInit {
  @Input()
  imagenUrl!: string;

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {}

}
