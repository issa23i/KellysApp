import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent   {

  email!: string;
  password!: string;
  confirmPassword!: string;
  nif!: string;
  nombre!: string;
  apellido1!: string;
  apellido2!: string;
  passwordError!: boolean

  constructor(public auth:AuthService) {}

  register() {
    const user = 
    {
      nif: this.nif,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      email: this.email,
      password: this.password
    };
    this.auth.register(user).subscribe((data)=>{
      console.log(data)
      
      this.auth.setToken(this.auth.token)
      console.log(this.auth.getToken())
    })
  }

}
