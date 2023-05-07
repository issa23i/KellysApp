import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @ViewChild(IonMenu) menu!: IonMenu;

  logado : boolean = false

  closeMenu() {
    this.menu.close();
  }

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.getUsuario() ? this.logado = true : this.logado = false
  }

}
