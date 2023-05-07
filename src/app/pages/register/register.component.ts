import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent   {

  email!: string;

  password!: string;
  confirmPassword!: string;
  passwordError: boolean = false

  nif!: string;
  // nifEditado sirve para que compruebe que se compruebe
      // que el usuario ha editado el campo nif
  nifEditado: boolean = false

  nombre!: string;
  apellido1!: string;
  apellido2!: string;

  onSubmit(registroForm: NgForm) {
    if (registroForm.invalid) {
      // El formulario es inválido, no lo envíes
      console.log('Formulario inválido');
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.passwordError = true
      console.log('Las contraseñas no coinciden')
      return;
    } else {
      this.passwordError = false
    }
    this.register()
    console.log('Solicitud enviada');
  }


  constructor(public auth:AuthService, public router: Router) {}

  dni = (dni : string) => {
    let n: number = +dni.slice(0,8)
    let letra: string = dni.slice(8,9)
    let resto: number = n%23
    let letras : string[] = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
    return letras[resto]===letra.toUpperCase()
  }

  
  nifValidado = () => {
    let dniValor = this.nif
    let regex = new RegExp(/^[0-9]{8}[A-Z]{1}$/)
    let valido = regex.test(dniValor) && this.dni(dniValor)
    return valido
  }

  register() {
    console.log('enviando')
      const user = 
    {
      nif: this.nif,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      email: this.email,
      password: this.password
    };
    this.auth.register(user)
    .subscribe({
      next: (data) => {
      console.log(data)
      
      this.auth.setToken(this.auth.token)
      console.log(this.auth.getToken())
      this.router.navigateByUrl("/home")
    },
    error: (err) => {
      console.error(err, err.message)
    }
  })
  }

  
}



