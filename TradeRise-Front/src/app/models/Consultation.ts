import {User} from '../models/User';

export class Consultation{
    idcons:number;
    date:Date;
    status:boolean;
    user:User;
    consultant:User;
    reponse:boolean;
  }