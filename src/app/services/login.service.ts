import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

const ACCESS_DATA = environment.appAccessData;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBase = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }

  getToken(userName: string, userPassword: string) {

    let headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(ACCESS_DATA)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let body = new URLSearchParams();
    body.append('username', userName);
    body.append('password', userPassword);
    body.append('grant_type', 'password');

    let urlEndPoint = `${this.urlBase}/security/oauth/token`;

    return this.http.post<any>(urlEndPoint, body.toString(), { headers }).toPromise();
  }

  saveToken(accessToken: string) {
    sessionStorage.setItem('accessToken', accessToken)
  }

  deleteToken() {
    sessionStorage.removeItem('accessToken');
  }
}
