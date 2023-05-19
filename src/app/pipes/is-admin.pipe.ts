import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

@Pipe({
  name: 'isAdmin'
})
export class IsAdminPipe implements PipeTransform {

  transform(utilisateur: Utilisateur): boolean {

    const listeNomRoles = utilisateur.roles.map(role => role.nom);

    return (
      listeNomRoles.indexOf('ROLE_ADMINISTRATEUR') != -1 ||
      listeNomRoles.indexOf('ROLE_SUPER_ADMINISTRATEUR') != -1
    );
  }

}