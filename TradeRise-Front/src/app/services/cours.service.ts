import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  readonly API_URL = 'http://localhost:8080/cours';
  constructor(private http: HttpClient) {}
  getAll() {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/`);
  }
  getCours(id: number) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/ ` + id);
  }
  getCoursByUser(id: number) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/byuser/ ` + id);
  }

  getFile(filename: string) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/file/` + filename);
  }
  add(cours: any, iduser: number) {
    return this.http.post(`${this.API_URL}/save/` + iduser, cours);
  }
  addwithfile(cours: any, iduser: number, file: string) {
    return this.http.post(`${this.API_URL}/save/` + iduser + '/' + file, cours);
  }
  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.API_URL}/uploadFile/`, formData);
  }
}
