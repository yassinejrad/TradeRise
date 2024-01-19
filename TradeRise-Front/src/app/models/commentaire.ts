import {User} from '../models/User';

export class commentaire{
    idcommentaire:number;
    contenu:string;
    user:User;
    parent:commentaire;
    reponses:commentaire[];
  }