import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from 'connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  formulaire: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    motDePasse: ["", [Validators.required]]
  })

  erreurLogin = false;

  constructor(private formBuilder: FormBuilder,
    private connexionService: ConnexionService,
    private router: Router
  ) { }



  onSubmit(): void {
    if (this.formulaire.valid) {
      this.connexionService.connexion(this.formulaire.value)
        .subscribe(
          {
            next: (jwt) => {
              localStorage.setItem("jwt", jwt);
              this.connexionService.updateUserConnecte();
              this.router.navigateByUrl('/accueil');
            },
            error: (erreur) => {
              this.erreurLogin = true;
            },
          }
        );
    }
  }
}
