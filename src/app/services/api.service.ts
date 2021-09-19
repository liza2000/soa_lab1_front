import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HumanBeing, WeaponType} from "../model/humanBeing";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  path = 'human-being/';

  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public saveHumanBeing(band:any): Observable<any>{
    return this.http.post(this.path, band,{headers: ApiService.getHeaders()});
  }

  public updateHumanBeing(id: number, band:any): Observable<any>{
    return this.http.put(this.path + id, band,{headers: ApiService.getHeaders()});
  }

  public getHumanBeings(data: any): Observable<any>{
    return this.http.get(this.path,{headers: ApiService.getHeaders(), params:data});
  }

  public deleteHumanBeing(id: number): Observable<any>{
    return this.http.delete(this.path + id,{headers: ApiService.getHeaders()})
  }
}