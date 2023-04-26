import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {
  getError,
  getGroup,
  getIsAuthenticated,
  getIsPhoneVerified,
  getLoading,
  getUser
} from "../../reducers/auth.reducer";
import {ToastService} from "../../../shared/toast.service";
import * as fromAuth from "../../reducers/auth.reducer";
import {ValidationFormsService} from "../../services/validation.service";
import {AppState} from "../../../state";
import {User} from "../../models/user_model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: any;
  submitted = false;
  formErrors: any;
  // @ts-ignore
  error$ = this.store.pipe(select(getError));
  // @ts-ignore

  isLoading$ = this.store.pipe(select(getLoading));
  // @ts-ignore

  isAuthenticated = this.store.pipe(select(getIsAuthenticated));
  // @ts-ignore
  isPhoneVerified = this.store.pipe(select(getIsPhoneVerified));
  currentUser$ = this.store.pipe(select(getUser));
  group$ = this.store.pipe(select(getGroup));
user:any;
  constructor(private toastService: ToastService,
              private store: Store<AppState>, private validationFormsService: ValidationFormsService) {
    this.formErrors = this.validationFormsService.errorMessages;
  }


  ngOnInit(): void {
    this.currentUser$.subscribe(
      data=>{
        if(data){
          this.user=data;
          this.profileForm = this.validationFormsService.initProfileForm(data);
          console.log(this.user)
        }
      }
    )
  }

  protected readonly name = name;
}
