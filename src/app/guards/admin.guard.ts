import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private cookieService : CookieService, private router: Router){}

  redirect(flag: boolean): any { // si no está logueado, enviar a login
    if (!flag){
      this.router.navigate(['/', 'inicio-sesion'])
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('token')
    this.redirect(cookie)
    const admin = JSON.parse(this.cookieService.get('usuario'))['data']['user']['rol'] === 'admin'
    return cookie && admin;
  }
  
}
