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
import {EventTypes} from "./includes/models/event-types";
import {ToastService} from "./shared/toast.service";

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
    private toastService: ToastService,
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

  showToast(type: EventTypes) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast('Success toast title', 'This is a success toast message.');
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast('Warning toast title', 'This is a warning toast message.');
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast('Error toast title', 'This is an error toast message.');
        break;
      default:
        this.toastService.showInfoToast('Info toast title', 'This is an info toast message.');
        break;
    }
  }
}
