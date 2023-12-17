import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Listing} from "../model/listing";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as moment from "moment/moment";
import {SearchRequest} from "../model/search-request";
import {ListingFull} from "../model/listing-full";
import {HelperService} from "./utils/helper.service";

@Injectable({
  providedIn: 'root'
})
export class HostApiService {


  public list: Listing[] = [
    {
      id: 1,
      "name": "Ромашка",
      "price": 1500,
      "rating": 0,
      "city": "Москва",
    },
    {
      id: 2,
      "name": "Ласточка",
      "price": 2000,
      "rating": 0,
      "city": "Санкт-Петербург",
    },
    {
      id: 3,
      "name": "Travelto",
      "price": 1000,
      "rating": 0,
      "city": "Тверь",
    }
  ]

  path = HelperService.ADDR + "listing/"
  constructor(private http: HttpClient) { }


  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization','Bearer '+localStorage.getItem("currentUser"))
    return headers;
  }



  public getListings(data:  SearchRequest): Observable<Listing[]>{
    return this.http.post<Listing[]>(this.path+'search',data,{headers: HostApiService.getHeaders()});
  }

  getById(id: number): Observable<ListingFull>{
    return this.http.get<ListingFull>(this.path+id, {headers: HostApiService.getHeaders()})
  }

  public saveListing(listing:any): Observable<any>{
    return this.http.post(this.path+'create-request', listing,{headers: HostApiService.getHeaders()});
  }

  public updateListing(id: number, listing:any): Observable<any>{
    return this.http.put(this.path + id, listing,{headers: HostApiService.getHeaders()});
  }
}
