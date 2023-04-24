import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {
  getError,
  getIsAuthenticated,
  getIsPhoneVerified,
  getLoading,
  getToken,
  getUser
} from "../../reducers/auth.reducer";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import * as fromAuth from "../../reducers/auth.reducer";
import codes from "country-calling-code";
import {SendCode} from "../../actions/auth.actions";

@Component({
  selector: 'app-send-verification-code',
  templateUrl: './send-verification-code.component.html',
  styleUrls: ['./send-verification-code.component.scss']
})
export class SendVerificationCodeComponent implements OnDestroy{
  // @ts-ignore

  verifyForm: FormGroup;
  submitted = false;
  // @ts-ignore
  token$ = this.store.pipe(select(getToken));

  // @ts-ignore

  error$ = this.store.pipe(select(getError));
  // @ts-ignore

  isLoading$ = this.store.pipe(select(getLoading));
  // @ts-ignore

  isAuthenticated = this.store.pipe(select(getIsAuthenticated));
  // @ts-ignore
  isPhoneVerified = this.store.pipe(select(getIsPhoneVerified));
  // @ts-ignore
  user$ = this.store.pipe(select(getUser));

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
    private store: Store<fromAuth.AuthState>,
    private formBuilder: FormBuilder,
  ) {
    this.user$.subscribe(
      user=>{
        this.verifyForm = this.formBuilder.group({
          phone_number: [user?.phone_number, [Validators.required, Validators.pattern(/^\d{10}$/)]],
          country_code: [user?.country_code, [Validators.required]],
        });
      }
    )
  this.token$.subscribe(
    data=>{
      console.log(data,"------------")
    }
  )

  }

  ngOnInit(): void {

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
  }

  get f() {
    return this.verifyForm.controls;
  }

  onSend() {

    this.submitted = true;

    if (this.verifyForm.valid) {
      console.log(this.verifyForm.value)
      this.store.dispatch(new SendCode(this.verifyForm.value));


    }

  }


  protected readonly codes = codes;

  ngOnDestroy(): void {
    this.authService.phone_number=this.verifyForm.value;
  }
}
