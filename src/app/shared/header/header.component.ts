import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @ViewChild(IonMenu) menu!: IonMenu;


  closeMenu() {
    this.menu.close();
  }

  constructor() { }

  ngOnInit() {
  }

  
  

}
