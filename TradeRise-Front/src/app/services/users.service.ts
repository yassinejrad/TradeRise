import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  PATH_OF_API = "http://localhost:8089"
  requestHeader = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('No-Auth', 'True');

  constructor(private httpClient: HttpClient, private httpclient: HttpClient, private userAuthService: UserAuthService) {

  }


  public registerNewUser(loginData: any) {

    const Data = {
      userName: loginData.value.userName,
      userPassword: loginData.value.userPassword
    };

    return this.httpclient.post(this.PATH_OF_API+'/registerNewUser', Data, {
      headers: this.requestHeader,
    });
  }
  public login(loginData: any) {

    const Data = {
      userName: loginData.value.userName,
      userPassword: loginData.value.userPassword
    };

    return this.httpclient.post(this.PATH_OF_API+'/authenticate', Data, {
      headers: this.requestHeader,
    });
  }


  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }


  // @ts-ignore
  public roleMatch(allowedRoles:  any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
