import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import * as fromAuth from "../reducers/auth.reducer";

import {User} from "../models/user_model";
import {select, Store} from "@ngrx/store";
import {getToken} from "../reducers/auth.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private readonly apiUrl = 'https://thioffeces.herokuapp.com/api';
  private readonly apiUrl = 'http://127.0.0.1:8000/api';
  private readonly refreshUrl = `${this.apiUrl}/refresh`;
  private _phone_number:any;

  constructor(private http: HttpClient, private store: Store<fromAuth.AuthState>,) {

  }

  signup(user: User): Observable<any> {
    console.log("This SingUp ---------------")

    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credential: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credential);
  }

  sendCode(body: any) {
    return this.http.post(`${this.apiUrl}/verify_phone/`, body)
  }

  verifyPhone(body: any) {
    return this.http.post(`${this.apiUrl}/verify_phone/check/`, body)
  }


  get phone_number(): any {
    return this._phone_number;
  }

  set phone_number(value: any) {
    this._phone_number = value;
  }
}
