import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {User} from "../models/user_model";

export class PasswordValidators {
  static confirmPassword(control: AbstractControl): Promise<ValidationErrors | null> {
    const password = control.get("password");
    const confirm = control.get("confirm_password");
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return Promise.resolve(null);
    }
    confirm?.setErrors({passwordMismatch: true});
    return Promise.resolve({ passwordMismatch: true });
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
initialLoginForm(){
    return this.fb.group({
      phone_number: ['', [Validators.required,Validators.pattern(this.formRules.phoneNumber)]],
      password: ['',[ Validators.required,]]
    });
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
      password: ['', [Validators.required,
        Validators.minLength(this.formRules.passwordMin),
        Validators.pattern(this.formRules.passwordPattern),]
      ],
      confirm_password: ['', [
        Validators.required,
        Validators.minLength(this.formRules.passwordMin),
        Validators.pattern(this.formRules.passwordPattern)
      ]],
      user_type: ['', Validators.required],
      country_code: ["", Validators.required],
      accept: [false, Validators.requiredTrue]
    }, {
      asyncValidators: PasswordValidators.confirmPassword
    }, );
  }



  formToUser(userForm: any): User {
    return {
      id: null,
      name: userForm.name,
      email: userForm.email,
      id_number: userForm.id_number,
      address: userForm.address,
      phone_number:userForm.phone_number,
      country_code: userForm.country_code,
      password: userForm.password,
      group:userForm.user_type,
      bio: userForm.bio,
      image: null,
    };
  }

}
