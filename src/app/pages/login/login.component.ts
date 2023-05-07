import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(public auth: AuthService, public router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.auth.login(user).subscribe({
      next: (data) => {
        console.log(data);
        this.auth.setToken(this.auth.token);
        console.log(this.auth.getToken());
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error(err, err.message, err.trace);
      },
    });
  }
}
