import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {
  // isLoading$: Observable<boolean>;
  // error$: Observable<string[]>;
  loginForm: FormGroup;
  submitted = false;
  formErrors = {
    phoneNumber: {
      required: 'Phone number is required',
      pattern: 'Please enter a valid phone number'
    },
    password: {
      required: 'Password is required'
    }
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    this.loginForm = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

  }
}
