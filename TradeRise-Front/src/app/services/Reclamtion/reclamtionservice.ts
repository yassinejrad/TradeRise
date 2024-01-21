import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Reclamtion} from "../../models/Reclamtion";
import {UserAuthService} from "../user-auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class reclamtionservice {
  readonly API_URL = 'http://localhost:808';
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }
  AjouteReclamtion(Reclamtion:Reclamtion): Observable<Reclamtion>{
    let jwt = this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.post<Reclamtion>(this.API_URL+`/Reclamation/AddReclamation`,Reclamtion,{headers:httpHeaders});
    }
listeAlllReclamtions(): Observable<Reclamtion[]>{
    let jwt =  this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<Reclamtion[]>(this.API_URL+`/Reclamation/Reclamations`,{headers:httpHeaders});
    }
listeReclamtionsforuser(name:String): Observable<Reclamtion[]>{
    let jwt =  this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<Reclamtion[]>(this.API_URL+`/Reclamation/Reclamationsforuser/${name}`,{headers:httpHeaders});
    }
editReclamtion(Reclamtion: Reclamtion): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Reclamation/updateReclamation`,Reclamtion,{ headers:httpHeaders });
    }
MarkItSeen(id: number): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Reclamation/MarkItSeen/${id}`,{ headers:httpHeaders });
    }
DeleteReclamtion(id: number): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.delete<any>(this.API_URL+`/Reclamation/removeReclamation/${id}`, { headers: httpHeaders });
}

}
