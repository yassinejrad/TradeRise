import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertifService {
  readonly API_URL = 'http://localhost:8080/certif';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  getAllByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/allbyuser/${userId}`);
  }
  getAllByUserCours(userId: number, coursId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API_URL}/byusercours/${userId}/${coursId}`
    );
  }

  getAllByCours(coursId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/allbycours/${coursId}`);
  }

  createCertif(userId: number, coursId: number, file: string): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/save/${userId}/${coursId}/${file}`,
      null
    );
  }
  getFile(filename: string) {
    //return this.http.get<Events[]>('')
    return this.http.get(`${this.API_URL}/file/` + filename);
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.API_URL}/uploadFile/`, formData);
  }

  updateCertif(id: number, certif: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, certif);
  }
  accordCertif(id: number): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/accord/${id}`, null);
  }
  refusCertif(id: number): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/refus/${id}`, null);
  }
  deleteCertif(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
