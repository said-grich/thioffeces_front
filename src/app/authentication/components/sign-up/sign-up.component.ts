import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Signup} from "../../actions/auth.actions";
import {AuthenticationService} from "../../services/authentication.service";
import codes from 'country-calling-code';
import {ValidationFormsService} from "../../services/validation.service";
import * as fromAuth from '../../reducers/auth.reducer';
import {getError, getIsAuthenticated, getLoading} from "../../reducers/auth.reducer";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  implements  OnInit{
  userForm:any;
  submitted = false;
  visible = true;
  dismissible = true;
  formErrors: any;
  formControls!: string[];
  code_country:any
  // @ts-ignore
  error$ = this.store.pipe(select(getError));
  // @ts-ignore

  isLoading$ = this.store.pipe(select(getLoading));
  // @ts-ignore

  isAuthenticated = this.store.pipe(select(getIsAuthenticated));

  constructor( private  store:Store<fromAuth.AuthState> ,private validationFormsService:ValidationFormsService,private  authService:AuthenticationService) {
    this.formErrors = this.validationFormsService.errorMessages;
    this.store.subscribe(state => console.log("Auth State" ,state));
  }

  ngOnInit() {
    this.userForm = this.validationFormsService.initialRegisterForm();

  }
  onSubmit() {
    if (this.onValidate()) {
      const  user =this.validationFormsService.formToUser(this.userForm.value)
      this.store.dispatch(new Signup(user));
    }
  }

  onValidate() {
    this.submitted = true;
    return this.userForm.valid;
  }

  protected readonly codes = codes;
}
