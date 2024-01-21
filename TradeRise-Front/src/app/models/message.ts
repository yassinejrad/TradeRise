import { Conversation } from './conversation';
import { User } from './user';

export class Message {
  id!: number;
  date!: Date;
  text!: string;
  file!: string;
  user!: User;
  conversation!: Conversation;
  constructor() {}
}
