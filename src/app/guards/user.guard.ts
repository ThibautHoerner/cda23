import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ConnectConfig, Observable } from 'rxjs';
import { ConnexionService } from '../../../connexion.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private connexionService: ConnexionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.connexionService._utilisateurConnecte.value != null) {
      return true;
    } else {
      return this.router.parseUrl('/connexion');
    }
  }

}
