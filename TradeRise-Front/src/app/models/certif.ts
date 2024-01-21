import { User } from './user';
import { Cours } from './cours';

export class Certif {
  id!: number;
  title!: string;
  file!: string;
  date!: Date;
  user!: User;
  cours!: Cours;

  constructor() {}
}
