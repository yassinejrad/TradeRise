import { User } from './user';

export class Cours {
  id!: number;
  title!: string;
  date!: Date;
  user!: User;
  file!: string;
  type!: string;
  description!: string;
  constructor() {}
}
