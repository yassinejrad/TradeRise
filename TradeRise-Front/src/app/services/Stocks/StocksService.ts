import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {UserAuthService} from "../user-auth.service";
import { Observable,map } from 'rxjs';
import {Stock} from "../../models/Stock";
import {User} from "../../models/User";
@Injectable({
  providedIn: 'root'
})
export class StocksService {
  readonly API_URL = 'https://api.polygon.io/v2/aggs/ticker';
  readonly API_URL2 = 'http://localhost:808';
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }
  
liste(stocksTicker:string,date1:string,date2:string): Observable<any[]>{
    let jwt = "W0qqZw01UPtVMw74MgvYUmhPdzionSRc";
    let httpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<any[]>(this.API_URL+`/${stocksTicker}/range/2/day/${date1}/${date2}`,{headers:httpHeaders});
    }
    listeStocks(name:string): Observable<Stock[]>{
      let jwt =  this.userAuthService.getToken();
      let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + jwt);
      return this.httpClient.get<Stock[]>(this.API_URL2+`/Stocks/ListStocks/${name}`,{headers:httpHeaders});
      }
      SaveMoney(name:string,money: number): Observable<any>{
        let jwt = this.userAuthService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({"Authorization": jwt})
        return this.httpClient.put(this.API_URL2+`/Stocks/SaveMoney/${name}/${money}`,{ headers:httpHeaders });
        }
        acheter(Stock:Stock,name:string): Observable<Stock>{
          let jwt = this.userAuthService.getToken();
          let httpHeaders = new HttpHeaders()
          .set('Authorization', 'Bearer ' + jwt);
          return this.httpClient.post<Stock>(this.API_URL2+`/Stocks/acheter/${name}`,Stock,{headers:httpHeaders});
          }
          vendre(name:string,id: number,number: number,coast: number): Observable<any>{
            let jwt = this.userAuthService.getToken();
            jwt = "Bearer " + jwt;
            let httpHeaders = new HttpHeaders({"Authorization": jwt})
            return this.httpClient.put(this.API_URL2+`/Stocks/vendre/${id}/${name}/${number}/${coast}`,{ headers:httpHeaders });
            }

            getmoney(name: string):Observable<User> {
              let jwt = this.userAuthService.getToken();
              let httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
              return this.httpClient.get<User>(this.API_URL2 + `/Stocks/getmoney/${name}`, { headers: httpHeaders })
              
            }
            

}
