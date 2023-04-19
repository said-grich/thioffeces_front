import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {select, Store} from "@ngrx/store";
import * as fromAuth from "./authentication/reducers/auth.reducer";
import {
  getError,
  getIsActive,
  getIsAuthenticated,
  getIsPhoneVerified,
  getLoading
} from "./authentication/reducers/auth.reducer";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CoreUI Free Angular Admin Template';
  // @ts-ignore
  error$ = this.store.pipe(select(getError));
  // @ts-ignore

  isLoading$ = this.store.pipe(select(getLoading));
  // @ts-ignore

  isAuthenticated$ = this.store.pipe(select(getIsAuthenticated));
  // @ts-ignore
  isPhoneVerified$ = this.store.pipe(select(getIsPhoneVerified));
  // @ts-ignore
  isActive = this.store.pipe(select(getIsActive));

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private  store:Store<fromAuth.AuthState>
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    this.store.subscribe(state => console.log("Auth State" ,state));

  }

  ngOnInit(): void {

      this.isAuthenticated$.subscribe(
        value => {
          if (!value){
            this.router.navigate(['/log-in']);
          }
        }
        
      )


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
