import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {UserAuthService} from "../../../services/user-auth.service";

@Component({
  selector: 'app-consultant-nav-bar',
  templateUrl: './consultant-nav-bar.component.html',
  styleUrls: ['./consultant-nav-bar.component.scss']
})
export class ConsultantNavBarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private userAuthService:UserAuthService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/auth/login']);
  }
}
