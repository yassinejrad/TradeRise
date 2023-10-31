import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList !:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.getAllUser();
    console.log(this.userList);
  }
  getAllUser(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.userList = res;
        console.log(res)
      })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUser();
  }
}
