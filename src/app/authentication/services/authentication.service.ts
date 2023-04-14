import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import { PhoneNumberUtil } from 'google-libphonenumber';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth_api:string="";


  private readonly apiUrl = "http://127.0.0.1:8000/api/"

  constructor(private http: HttpClient) {}

  signup(user: { email: string, password: string }): Observable<any> {
    console.log("-------------------->","Test")
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const parsedPhoneNumber = phoneUtil.parse(phoneNumber);
      return phoneUtil.isValidNumber(parsedPhoneNumber);
    } catch (e) {
      return false;
    }
  }


}
