import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {AuthState, getError, getIsAuthenticated, getIsPhoneVerified, getLoading} from '../../reducers/auth.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationFormsService} from "../../services/validation.service";
import {Login, Signup} from "../../actions/auth.actions";
import * as fromAuth from "../../reducers/auth.reducer";
import {ToastService} from "../../../shared/toast.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: any;
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

  constructor(private toastService: ToastService,
    private store: Store<fromAuth.AuthState>, private validationFormsService: ValidationFormsService) {
    this.formErrors = this.validationFormsService.errorMessages;
  }


  ngOnInit(): void {
    this.loginForm = this.validationFormsService.initialLoginForm();

  }

  onSubmit() {
    if (this.onValidate()) {
      console.log(this.loginForm.value, this.loginForm.valid);
      this.store.dispatch(new Login(this.loginForm.value));

    }
  }

  onValidate() {
    this.submitted = true;
    return this.loginForm.valid;
  }

  testToaser() {
    console.log("Test")
    this.toastService.showSuccessToast('Success toast title', 'This is a success toast message.');
  }

}
