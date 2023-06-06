import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  email!: string;
  emailEditado: boolean = false

  password!: string;
  passEditado: boolean = false


  errorAutenticacion: boolean = false

  constructor(public auth: AuthService, 
    public router: Router, 
    private cookieService: CookieService) {}


  login() {
    this.errorAutenticacion = false
    const user = { email: this.email, password: this.password };
    this.auth.login(user).subscribe({
      next: (data) => {
        console.log(data);
        this.auth.setToken(this.auth.token);
        console.log(this.auth.getToken());
        
        if(this.router.url === '/login'){
          this.cookieService.set('previousUrl', this.router.url);
          this.router.navigateByUrl('/home');
        } else {
          console.log('estoy en otra ruta distinta a login')
        }
      },
      error: (err) => {
        console.error('Error en el login ', err);
        this.errorAutenticacion = true
        setTimeout(() => {
          this.errorAutenticacion = false
        }, 6000);
      },
    });
  }

  emailValidado = (email: string) => {
    let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return regex.test(email);
  }

  passValidado = (pass : string) => {
    // Al menos una minúscula, una mayúscula, un número, mínimo 8 caracteres
    let regex : RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    console.log(regex.test(pass))
    return regex.test(pass)
  }
  
}
