import { Component, OnInit } from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";

@Component({
  selector: 'app-consultant-base',
  templateUrl: './consultant-base.component.html',
  styleUrls: ['./consultant-base.component.scss']
})
export class ConsultantBaseComponent implements OnInit {
  isLoading: boolean;

  constructor(private router: Router) {

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });


  }

  ngOnInit(): void {
  }




}
