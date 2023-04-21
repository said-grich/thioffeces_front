import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {User} from "../models/user_model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth_api:string="";

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
      'Referer': window.location.href
    })
  };

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private readonly apiUrl = 'https://thioffeces.herokuapp.com/api';
  // private readonly apiUrl = 'http://127.0.0.1:8000/api';
  private readonly refreshUrl = `${this.apiUrl}/refresh`;
  private readonly authTokenKey = 'token';

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  login(credential:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credential );
  }
  setAuthToken(authToken: string): void {

    localStorage.setItem(this.authTokenKey, authToken);
  }
  setRefreshToken(authToken: string): void {

    localStorage.setItem(this.authTokenKey, authToken);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
  getRefreshToken(): string | null {
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

  private getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      // @ts-ignore
      return parts.pop().split(';').shift();
    }
    return '';
  }

}
