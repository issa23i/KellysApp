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
  emailEditado: boolean = false

  password!: string;
  passEditado: boolean = false

  confirmPassword!: string;
  confirmEditado: boolean = false

  passwordError: boolean = false
  passwordRegexError: boolean = false

  nif!: string;
  nifEditado: boolean = false

  nombre!: string;
  nombreEditado: boolean = false

  apellido1!: string;
  apellido1Editado: boolean = false

  apellido2!: string;
  apellido2Editado: boolean = false

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

    if (!this.passValidado(this.password)){
      console.log("La contraseña no cumple con el criterio de validación. Debe tener al menos 8 caracteres y al menos 1 dígito, 1 letra minúscula y 1 letra mayúscula")
      this.passwordRegexError = true
      return
    } else {
      this.passwordRegexError = false
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

  passValidado = (pass : string) => {
    // Al menos una minúscula, una mayúscula, un número, mínimo 8 caracteres
    let regex : RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    console.log(regex.test(pass))
    return regex.test(pass)
  }

  emailValidado = (email: string) => {
    let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return regex.test(email);
  }
  
  confirmValidado = (pass: string, confirm: string) => {
    return pass === confirm
  }

  nombreValidado = (nombre: string) => {
    let regex = new RegExp(/^\w{3,}$/)
    return regex.test(nombre)
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
      console.error( 'Error en el registro de usuario ', err)
    }
  })
  }

  
}



