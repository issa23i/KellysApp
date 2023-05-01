import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { PorQueComponent } from './pages/por-que/por-que.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
    path: 'mi-perfil',
    component: MiPerfilComponent,
    pathMatch: 'full'
  },
  {
    path: 'mis-reservas',
    component: MisReservasComponent,
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
