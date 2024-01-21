import { Component, OnInit } from '@angular/core';
import {RoleService} from "../../../services/roles/role.service";
import {Role} from "../../../models/Role";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  role!:Role;
  roleList !:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  constructor(private roleService:RoleService) { }

  ngOnInit(): void {
    this.getAllRoles()
  }
  getAllRoles(){
    this.roleService.getAllRoles().subscribe(
      res => {
        this.roleList = res;
        console.log(res)
      })
  }

  onSubmit(registerForm : NgForm) {
    this.roleService.createNewRole(registerForm).subscribe(
      (response: any) => {

        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllRoles();
  }
}
