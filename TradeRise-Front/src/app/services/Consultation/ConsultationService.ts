import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Consultation} from "../../models/Consultation";
import {UserAuthService} from "../user-auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  readonly API_URL = 'http://localhost:808';
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }
  AjouteConsultation(Consultation:Consultation,name:string): Observable<Consultation>{
    let jwt = this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.post<Consultation>(this.API_URL+`/Consultation/makereservation/${name}`,Consultation,{headers:httpHeaders});
    }
    listconsultant(name:string): Observable<Consultation[]>{
    let jwt =  this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<Consultation[]>(this.API_URL+`/Consultation/listconsultant/${name}`,{headers:httpHeaders});
    }
    listuser(name:string): Observable<Consultation[]>{
    let jwt =  this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<Consultation[]>(this.API_URL+`/Consultation/listuser/${name}`,{headers:httpHeaders});
    }
    updateconsultation(id: number,date:Date): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Consultation/updateconsultation/${id}/${date}`,{ headers:httpHeaders });
    }
    reponseconsultant(id: number,name:string,response:boolean): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Consultation/reponseconsultant/${id}/${name}/${response}`,{ headers:httpHeaders });
    }
    removeconsultation(id: number): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.delete<any>(this.API_URL+`/Consultation/removeconsultation/${id}`, { headers: httpHeaders });
}

}
