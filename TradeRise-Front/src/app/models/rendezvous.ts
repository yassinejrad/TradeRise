import { User } from './user';
import { Cours } from './cours';

export class RendezVous {
  id!: number;
  title!: string;
  etat!: string;
  datestart!: Date;
  dateend!: Date;
  user!: User;
  cours!: Cours;

  constructor() {}
}
