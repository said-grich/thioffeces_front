import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import { Store } from '@ngrx/store';
import {Signup} from "../../actions/auth.actions";
import {AuthenticationService} from "../../services/authentication.service";
import codes from 'country-calling-code';
import {ValidationFormsService} from "../../services/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  implements  OnInit{
  userForm:any;
  submitted = false;
  formErrors: any;
  formControls!: string[];
  code_country:any
  constructor( private  store:Store ,private validationFormsService:ValidationFormsService,private  authService:AuthenticationService) {
    this.formErrors = this.validationFormsService.errorMessages;
  }

  ngOnInit() {
    console.log(codes)
    this.userForm = this.validationFormsService.initialRegisterForm();
  }
  onSubmit() {
    // this.store.dispatch(new Signup({ email: 'example@mail.com', password: 'password' }));
    console.log("---------------->",this.code_country)
    console.warn(this.onValidate(), this.userForm.value);

    if (this.onValidate()) {
      // TODO: Submit form value
      console.warn(this.userForm.value);
      alert("SUCCESS!");
    }
  }
  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.userForm.status === "VALID";
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls['password'].value;
    let confirm_password = group.controls['confirm_password'].value;
    return password === confirm_password ? null : { password_is_not_matching: true }
  }


  protected readonly codes = codes;
}
