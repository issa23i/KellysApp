import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { PorQueComponent } from './pages/por-que/por-que.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
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
