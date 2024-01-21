import { User } from './user';

export class Conversation {
  id!: number;
  lastupdate!: Date;
  user1!: User;
  user2!: User;
  constructor() {}
}
