import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getError, getIsAuthenticated, getIsPhoneVerified, getLoading} from "../../reducers/auth.reducer";
import * as fromAuth from "../../reducers/auth.reducer";
import {ReSendCode, VerifyPhone} from "../../actions/auth.actions";
import {AppState} from "../../../state";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {
  phone_number:any;
  verifyForm: FormGroup;
  submitted = false;
  // @ts-ignore

  error$ = this.store.pipe(select(getError));
  // @ts-ignore

  isLoading$ = this.store.pipe(select(getLoading));
  // @ts-ignore

  isAuthenticated = this.store.pipe(select(getIsAuthenticated));
  // @ts-ignore
  isPhoneVerified = this.store.pipe(select(getIsPhoneVerified));

  formErrors = {
    phoneNumber: {
      required: 'Phone number is required',
      pattern: 'Please enter a valid phone number'
    },
    verificationCode: {
      required: 'verification code is required'
    }
  };


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

    this.verifyForm = this.formBuilder.group({
      verification_code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Retrieve the data from the navigation state

   this.isAuthenticated.subscribe(
data=>{
  if(!data){
    this.router.navigate(["/login"])
  }
}
   )
   this.isPhoneVerified.subscribe(
     isPhoneVerified=>{
       if(isPhoneVerified){
         console.log("Yes it is Vir")
         this.router.navigate(["/"])
       }
     }
   )

this.phone_number=this.authService.phone_number;
    console.log(this.phone_number)


  }

  get f() {
    return this.verifyForm.controls;
  }

  verify() {
    this.submitted = true;
    if (this.verifyForm.valid) {
      let payload={
        "phone_number":this.phone_number["phone_number"],
        "verification_code":this.verifyForm.value["verification_code"],
      }
      this.store.dispatch(new VerifyPhone(payload))
    }

  }

  onResendCode() {
    let payload={
      "phone_number":this.phone_number["phone_number"],
    }
    this.store.dispatch(new ReSendCode(payload))
  }
}
