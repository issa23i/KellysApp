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
  password!: string;

  constructor(public auth: AuthService, 
    public router: Router, 
    private cookieService: CookieService) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.auth.login(user).subscribe({
      next: (data) => {
        console.log(data);
        this.auth.setToken(this.auth.token);
        console.log(this.auth.getToken());
        this.cookieService.set('previousUrl', this.router.url);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error(err, err.message);
      },
    });
  }

  
}
