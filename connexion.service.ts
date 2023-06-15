import { Injectable } from '@angular/core';
import { Utilisateur } from './src/app/models/utilisateur';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  //Lors de la connexion > stocker les infos utilisateurs, adapter la page en fonction de celui qui est connecté
  public _utilisateurConnecte: BehaviorSubject<Utilisateur | null> =
    new BehaviorSubject<Utilisateur | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.updateUserConnecte();
  }

  connexion(utilisateur: Utilisateur): Observable<string> {

    return this.http
      .post(
        environment.serverUrl + '/connexion', utilisateur, {
        responseType: 'text'
      })
  }

  updateUserConnecte() {
    const jwt = localStorage.getItem("jwt")
    if (jwt != null) {
      const data = jwt.split('.')[1];
      const json = window.atob(data);
      const donnesUtilisateur = JSON.parse(json);

      //ROLE_UTILISATEUR, ROLE_ADMINISTRATEUR
      const listeRole = donnesUtilisateur.roles
        .split(',')
        .filter((role: string) => role != "")
        .map((nomRole: string) => {
          return { nom: nomRole };
        });

      const utilisateur: Utilisateur = {
        email: donnesUtilisateur.sub,
        nom: donnesUtilisateur.nom,
        prenom: donnesUtilisateur.penom,
        roles: listeRole,
        pays: { nom: donnesUtilisateur.pays }
      };

      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }
  }

  deconnexion() {
    localStorage.removeItem("jwt");
    this._utilisateurConnecte.next(null);
    this.router.navigateByUrl("/connexion");
  }
}
