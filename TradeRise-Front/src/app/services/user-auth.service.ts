import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

    constructor() {}

    public setRoles(roles: []) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }

    public getRoles(): [] {
      return JSON.parse(<string>localStorage.getItem('roles'));
    }

    public setToken(jwtToken: string) {
      localStorage.setItem('jwtToken', jwtToken);
    }

    public getToken(): string {
      return <string>localStorage.getItem('jwtToken');
    }

    public clear() {
      localStorage.clear();
    }

    public isLoggedIn() {
      return this.getRoles() && this.getToken();
    }


    public setname(name: string) {
      localStorage.setItem('name', name);
    }

    public getname(): string {
      return <string>localStorage.getItem('name');
    }

    public setpoint(point: any) {
      localStorage.setItem('point', point);
    }

    public getpoint(): any {
      return <string>localStorage.getItem('point');
    }
}
