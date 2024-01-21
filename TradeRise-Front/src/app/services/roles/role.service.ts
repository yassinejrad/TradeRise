import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "../../models/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly API_URL = 'http://localhost:808';
  constructor(private httpClient: HttpClient) { }
  getAllRoles() {
    return this.httpClient.get(this.API_URL+`/getAllRoles`)
  }
  createNewRole(roleData: any) {
    const Data = {
      roleName: roleData.value.roleName,
      roleDescription: roleData.value.roleDescription
    };
    return this.httpClient.post(`${this.API_URL}/createNewRole`, Data)
  }
}
