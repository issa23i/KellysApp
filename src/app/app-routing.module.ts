import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { PorQueComponent } from './pages/por-que/por-que.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { InicioSesionComponent } from './shared/inicio-sesion/inicio-sesion.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'registro',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-reservas',
    component: MisReservasComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-reservas/:id',
    component: ReservaComponent,
    pathMatch: 'full'
  },
  {
    path: 'reserva/:id',
    component: ReservaComponent,
    pathMatch: 'full'
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    pathMatch: 'full'
  },
  {
    path: 'por-que',
    component: PorQueComponent,
    pathMatch: 'full'
  },
  {
    path: 'hotel',
    component: HotelComponent,
    pathMatch: 'full'
  },
  {
    path: 'hotel/:id',
    component: HotelComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
  path: '**',
  pathMatch: 'full',
  redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
