import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {

  private _persona! : Persona 
  private _existe: Boolean = false;

  constructor(private personaService : PersonaService
    , private changeDetector: ChangeDetectorRef) { }

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
      },
    });
  }


  get persona(){
    return this._persona
  }
  public get existe(): Boolean {
    return this._existe;
  }
  

}
