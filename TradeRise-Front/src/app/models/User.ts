import {Role} from '../models/Role';
export class User{
    userName:string;
    userFirstName:string;
    userLastName:string;
    userPassword:string;
    type:string;
    email:string;
    role:Role[];
    points:number;
    money:number;
  }
  