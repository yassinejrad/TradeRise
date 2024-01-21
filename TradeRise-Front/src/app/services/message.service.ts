import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly API_URL = 'http://localhost:8080/conversation';
  constructor(private http: HttpClient) {}
  getAll() {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/getall`);
  }
  getFile(filename: string) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/file/` + filename);
  }
  add(message: any, id: number, iduser: number) {
    return this.http.post(
      `${this.API_URL}/addmessage/` + id + '/' + iduser,
      message
    );
  }
  addwithfile(message: any, id: number, iduser: number, file: string) {
    return this.http.post(
      `${this.API_URL}/addmessage/` + id + '/' + iduser + '/' + file,
      message
    );
  }
  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.API_URL}/uploadFile/`, formData);
  }
}
