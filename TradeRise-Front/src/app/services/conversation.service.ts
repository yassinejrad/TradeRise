import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  readonly API_URL = 'http://localhost:8080/conversation';
  constructor(private http: HttpClient) {}
  getConversations(id: number) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/getconveruser/` + id);
  }
  getConversationMessages(id: number) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/messages/` + id);
  }
  getConversationusers(iduser1: number, iduser2: number) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/` + iduser1 + '/' + iduser2);
  }
  add(iduser1: number, iduser2: number) {
    return this.http.post(
      `${this.API_URL}/save/` + iduser1 + '/' + iduser2,
      null
    );
  }
  /*getConversations() {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/getall`);
  }*/
}
