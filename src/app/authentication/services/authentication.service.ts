import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import { PhoneNumberUtil } from 'google-libphonenumber';
import {User} from "../models/user_model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth_api:string="";



  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private readonly apiUrl = 'https://thioffeces.herokuapp.com/api';
  private readonly refreshUrl = `${this.apiUrl}/refresh`;
  private readonly authTokenKey = 'authToken';
  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  login(credential:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credential);
  }
  setAuthToken(authToken: string): void {
    console.log(authToken,"--------------")
    localStorage.setItem(this.authTokenKey, authToken);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
  refreshToken(): Observable<string | null>{
    if (this.refreshTokenInProgress) {
      // If refresh token is already in progress, return the existing subject
      return this.refreshTokenSubject.asObservable();
    } else {
      // Set refreshTokenInProgress flag and clear existing refresh token subject
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      // Call API to refresh token
      return this.http.post(`${this.refreshUrl}`, {}).pipe(
        tap((response: any) => {
          // Set new access token and clear refresh token flag
          this.setAuthToken( response.access_token);
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(response.access_token);
        })
      );
    }
  }







logout() {
    localStorage.removeItem(this.authTokenKey);
  }
}
