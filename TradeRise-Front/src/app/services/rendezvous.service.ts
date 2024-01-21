import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  readonly API_URL = 'http://localhost:8080/rendezvous';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
  getRendezVoussForDateAndCourse(
    date: Date | string,
    date1: Date | string,
    coursId: number
  ): Observable<boolean> {
    const dateObject = date instanceof Date ? date : new Date(date);

    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObject.getDate()).slice(-2);
    const hours = ('0' + dateObject.getHours()).slice(-2);
    const minutes = ('0' + dateObject.getMinutes()).slice(-2);
    const formattedDate = `${year}${month}${day}${hours}${minutes}`;
    const dateObject1 = date1 instanceof Date ? date1 : new Date(date1);

    const year1 = dateObject1.getFullYear();
    const month1 = ('0' + (dateObject1.getMonth() + 1)).slice(-2);
    const day1 = ('0' + dateObject1.getDate()).slice(-2);
    const hours1 = ('0' + dateObject1.getHours()).slice(-2);
    const minutes1 = ('0' + dateObject1.getMinutes()).slice(-2);
    const formattedDate1 = `${year1}${month1}${day1}${hours1}${minutes1}`;
    return this.http.get<boolean>(
      `${this.API_URL}/date/${formattedDate}/${formattedDate1}/${coursId}`
    );
  }
  createRendezVous(
    rendezVous: any,
    userId: number,
    coursId: number
  ): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/save/${userId}/${coursId}`,
      rendezVous
    );
  }

  updateRendezVous(id: number, etat: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}/${etat}`, null);
  }

  deleteRendezVous(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
