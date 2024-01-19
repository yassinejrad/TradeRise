import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Prise} from "../../models/Prise";
import {UserAuthService} from "../user-auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriseService {
  readonly API_URL = 'http://localhost:8089';
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }
  AjoutePrise(Prise:Prise): Observable<Prise>{
    let jwt = this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.post<Prise>(this.API_URL+`/Prises/addprise`,Prise,{headers:httpHeaders});
    }
listeAlllPrises(): Observable<Prise[]>{
    let jwt =  this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<Prise[]>(this.API_URL+`/Prises/allPrises`,{headers:httpHeaders});
    }
    updateprise(Prise: Prise): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Prises/updateprise`,Prise,{ headers:httpHeaders });
    }
    acheterPrise(id: number,name:string): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Prises/acheterPrise/${id}/${name}`,{ headers:httpHeaders });
    }
    removeprise(id: number): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.delete<any>(this.API_URL+`/Prises/removeprise/${id}`, { headers: httpHeaders });
}
givepoints(point: number,name:string): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Prises/givepoints/${name}/${point}`,{ headers:httpHeaders });
    }

}
