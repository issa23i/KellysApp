import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/login-response';
import { CookieService } from 'ngx-cookie-service';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlLogin: string = environment.apiUrl+"/auth/login"
  private urlRegister: string = environment.apiUrl+"/auth/register"
  token: any;


  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.urlLogin,user).pipe(
      tap(response => {
        console.log(response.data.token)
        this.token = response.data.token;
      })
    )
  }

  register(user: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.urlRegister,user).pipe(
      tap(response => {
        console.log(response.data.token)
        this.token = response.data.token;
      })
    )
  }

  setToken(token: string){
    this.cookies.set("token", token);
  }

  getToken(){
    return this.cookies.get("token");
  }
}
