import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {Title} from '@angular/platform-browser';
import {select, Store} from "@ngrx/store";
import * as fromAuth from "./authentication/reducers/auth.reducer";
import {
  AuthState,
  getError,
  getIsActive,
  getIsAuthenticated,
  getIsPhoneVerified,
  getLoading
} from "./authentication/reducers/auth.reducer";
import {ToastService} from "./shared/toast.service";
import {ClearError} from "./authentication/actions/auth.actions";
import {AppState} from "./state";
import {getErrorMsg, getSuccessMsg} from "./reducers/toastReducer";
import {ClearMsg} from "./actions/toastActions";


@Component({
  selector: 'app-root',
  template: '<app-toaster></app-toaster> <router-outlet></router-outlet>',
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
   successMsg$ = this.store.pipe(select(getSuccessMsg));
   errorMsg$ = this.store.pipe(select(getErrorMsg));



  constructor(
    private toastService: ToastService,
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private store: Store<AppState>
  ) {
    // iconSet singleton
    iconSetService.icons = {...iconSubset};

  }

  ngOnInit(): void {

    this.successMsg$.subscribe(
      value => {
        if (value) {
          this.toastService.showSuccessToast(value["title"], value["body"])

        }
      }
    )
    this.errorMsg$.subscribe(
      value => {
        if (value) {
          this.toastService.showErrorToast(value["title"], value["body"])

        }
      }
    )

    this.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.isPhoneVerified$.subscribe(phoneVerified => {
          if (!phoneVerified) {
            // Show a message to the user indicating that they need to verify their phone number
            this.router.navigate(["/send-code"])
          }
        });
      }
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        this.store.dispatch(new ClearError());
        this.store.dispatch(new ClearMsg());

      }
    });
  }

}
