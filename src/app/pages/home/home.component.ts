import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(public auth: AuthService) { 
    this.getUserLogged();
  }

  ngOnInit() {
    
  }

  getUserLogged(){
    if(this.auth.getUsuario()){
      let usuario : Usuario = this.auth.getUsuario()
      console.log(usuario.data.user.nombre);
     } else {
      console.log("No hay usuario logado");
     }
  }

}
