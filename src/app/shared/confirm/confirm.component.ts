import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResultadoBusqueda } from 'src/app/interfaces/resultado-busqueda';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent  implements OnInit {

  resultado!: ResultadoBusqueda;


  constructor(
              private reservaService: ReservaService, 
              private router: Router,
              private authService: AuthService) { 
                let idUsuario = this.authService.getIdUsuarioLogged()
                if (!idUsuario) {
                  this.router.navigateByUrl('/login');
                }
              }

  ngOnInit() {
    this.resultado = this.reservaService.resultado
  }

  

  confirmarReserva() {
    this.reservaService.setReserva()
        .subscribe({
          next: (data) => {
            // ir a la página de la reserva
            console.log(data['data']._id)
            console.log(data)
            this.router.navigateByUrl(`/reserva/${data['data']._id}`);
            console.log('Reserva confirmada');

          },
          error: (err) => {
            console.error(err)
          }
        })
  }

  
  

  
}
