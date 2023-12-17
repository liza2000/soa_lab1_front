import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public httpClient: HttpClient) { }

  public getHeaders(user: User): HttpHeaders {
    let base64Credential: string;
    base64Credential = btoa(unescape(encodeURIComponent(user.login + ':' + user.password)));
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Authorization', 'Basic ' + base64Credential);
    return headers;
  }

  public logIn(user: User) {
    return of(true)
    // return this.httpClient.get('/api/login',
    //   {headers: this.getHeaders(user)}).pipe( map(r=>{
    //     if (JSON.parse(JSON.stringify(r)) != null) {
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       localStorage.setItem('userHash', btoa( unescape(encodeURIComponent(user.login + ':' + user.password))));
    //     }
    //   })
    // );
  }

  logOut() {
    return this.httpClient.post('api/logout', {});
  }
  createAccount(user: User) {
    return of(true)
    // return this.httpClient.post('/api/register' , user);
  }
}
