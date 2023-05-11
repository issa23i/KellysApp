import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/interfaces/persona';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {

  private _persona! : Persona 
  private _existe: Boolean = false;

  constructor(private personaService : PersonaService
    , private authService : AuthService
    , private changeDetector: ChangeDetectorRef
    , private router: Router) { }

  ngOnInit(): void {
    console.log(this.personaService.obtenerPersona())
    this.personaService.obtenerPersona()
    .subscribe({
      next: (resp: any) => {
        this._persona = resp.persona
        this._existe = true;
        console.log(this._persona)
        this.changeDetector.detectChanges()
      },
      error: (err) => {
        console.error(err, err.message);
        console.log('No se ha iniciado sesión')
        this.router.navigateByUrl('/login')
      },
    });
  }

  logout(){
    this.authService.logout()
  }

  get persona(){
    return this._persona
  }
  public get existe(): Boolean {
    return this._existe;
  }
  

}
