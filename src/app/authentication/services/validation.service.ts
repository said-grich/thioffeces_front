import {Injectable} from '@angular/core';
import codes from 'country-calling-code';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";

export class PasswordValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password");
    const confirm = control.get("confirmPassword");
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({passwordMismatch: true});
    return {passwordMismatch: true};
  }
}

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    phoneNumber: '^\\d{8,15}$'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  constructor(private fb: FormBuilder,) {
    this.errorMessages = {
      name: {
        required: 'First name is required',
      },
      email: {
        required: 'Email is required !',
        email: 'Invalid email address',
      },
      phoneNumber: {
        required: 'Phone number is required',
        pattern: 'Invalid phone number',
        minlength: 'Phone number must be at least 10 digits long',
        maxlength: 'Phone number cannot be more than 15 digits long'
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      },
    };
  }


  initialRegisterForm() {
    return this.fb.group({
        name: ['', [
          Validators.required,
          Validators.minLength(this.formRules.usernameMin),
          Validators.pattern(this.formRules.nonEmpty)
        ]],
        email: ['', [Validators.required, Validators.email]],
        id_number: ['', Validators.required],
        address: ['', Validators.required],
        phone_number: ['', [
          Validators.required,
          Validators.pattern(this.formRules.phoneNumber),
        ]],
        password: ['', Validators.required,
          Validators.minLength(this.formRules.passwordMin),
          Validators.pattern(this.formRules.passwordPattern)
        ],
        confirm_password: ['', [
          Validators.required,
          Validators.minLength(this.formRules.passwordMin),
          Validators.pattern(this.formRules.passwordPattern)
        ]],
        user_type: ['', Validators.required],
        country_code: ["", Validators.required],
        accept: [false, [Validators.requiredTrue]]

      }, {validators: [PasswordValidators.confirmPassword]}
    );
  }


}
