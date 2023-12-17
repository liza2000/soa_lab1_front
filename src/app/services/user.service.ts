import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HelperService} from "./utils/helper.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  path = HelperService.ADDR + 'auth/'
  constructor(public httpClient: HttpClient) { }

  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }


  public logIn(user: any): Observable<any> {
    // return of({token: 'fd', role: 'HOST'})
    return this.httpClient.post(this.path + 'login',user,
      {headers: UserService.getHeaders()})
  }


  createAccount(user: any): Observable<any> {
    // return of(true)
    return this.httpClient.post(this.path + 'register' , user, {headers: UserService.getHeaders()});
  }

  createHostAccount(user: any): Observable<any> {
    // return of(true)
    return this.httpClient.post(this.path + 'host-register' , user, {headers: UserService.getHeaders()});
  }
}
