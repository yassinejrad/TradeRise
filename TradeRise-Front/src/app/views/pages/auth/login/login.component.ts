import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {UsersService} from "../../../../services/users.service";
import {NgForm} from "@angular/forms";
import {UserAuthService} from "../../../../services/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute,private userService: UsersService,private userAuthService: UserAuthService) { }

  ngOnInit(): void {

  }


  login(loginForm : NgForm) {
    this.userService.login(loginForm).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        console.log(response);

        const role = response.user.role[0].roleName;
        console.log('bonjour : ' + role)
        if (role === 'Admin') {
          this.router.navigate(['/Admin/Dashboard']);
        }else if (role === 'Consultant') {
          this.router.navigate(['/Consultant/Dashboard']);
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
