import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {commentaire} from "../../models/commentaire";
import {UserAuthService} from "../user-auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  readonly API_URL = 'http://localhost:808';
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }
  AjouteCommenatire(Commenatire:commentaire): Observable<commentaire>{
    let jwt = this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.post<commentaire>(this.API_URL+`/Commentaire/addcommentaire`,Commenatire,{headers:httpHeaders});
    }
    listCommenatire(): Observable<commentaire[]>{
    let jwt =  this.userAuthService.getToken();
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<commentaire[]>(this.API_URL+`/Commentaire/all`,{headers:httpHeaders});
    }
    Ajoutereponse(Commenatire:commentaire,id:number): Observable<commentaire>{
      let jwt = this.userAuthService.getToken();
      let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + jwt);
      return this.httpClient.post<commentaire>(this.API_URL+`/Commentaire/addreponse/${id}`,Commenatire,{headers:httpHeaders});
      }
    updateCommenatire(id: number,contenu:string): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.put(this.API_URL+`/Commentaire/updatecommentaire/${id}/${contenu}`,{ headers:httpHeaders });
    }
    removeCommenatire(id: number): Observable<any>{
    let jwt = this.userAuthService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.httpClient.delete<any>(this.API_URL+`/Commentaire/removecommentaire/${id}`, { headers: httpHeaders });
}

}
