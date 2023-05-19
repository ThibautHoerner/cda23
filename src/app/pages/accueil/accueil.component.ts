import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { IsAdminPipe } from 'src/app/pipes/is-admin.pipe';
import { ConnexionService } from 'src/app/services/connexion.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  listeUtilisateur: Utilisateur[] = [];
  isAdmin: boolean = false;

  dateMaintenant: Date = new Date();

  constructor(
    private serviceUtilisateur: UtilisateurService,
    private connexionService: ConnexionService
  ) { }

  ngOnInit() {
    this.serviceUtilisateur._utilisateurs.subscribe(
      utilisateurs => this.listeUtilisateur = utilisateurs
    );

    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => 
      (this.isAdmin = 
        utilisateur != null 
        ? new IsAdminPipe().transform(utilisateur) 
        : false)
    );

    this.raffraichir();
  }



  raffraichir(): void {
    this.serviceUtilisateur.getUtilisateurs();
  }

  onDeleteUser(idUtilisateur: number | undefined) {

    if (idUtilisateur != undefined) {
      this.serviceUtilisateur
        .deleteUtilisateurs(idUtilisateur)
        .subscribe((utilisateurs) => this.raffraichir());
    }
  }
}
