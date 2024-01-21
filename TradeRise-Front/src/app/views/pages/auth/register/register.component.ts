import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";
import {UsersService} from "../../../../services/users.service";
import {UserAuthService} from "../../../../services/user-auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private userService: UsersService,private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  onRegister(registerForm : NgForm) {
    this.userService.registerNewUser(registerForm).subscribe(
      (response: any) => {

        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}
