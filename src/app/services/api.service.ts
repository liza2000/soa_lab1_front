import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Listing} from "../model/listing";
import {Observable, of} from "rxjs";
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  path = 'listing/';

  public list: Listing[] = []

  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public saveListing(listing:any): Observable<any>{
    listing.date = new Date()
    this.list.push(listing)
    return of(listing)
    // return this.http.post(this.path, listing,{headers: ApiService.getHeaders()});
  }

  public updateListing(id: number, listing:any): Observable<any>{
    return this.http.put(this.path + id, listing,{headers: ApiService.getHeaders()});
  }

  public getListings(data: any): Observable<any>{
    return of ({list: this.list.filter(l => {
        return (!(data.name?.length)|| l.name.includes(data.name))
        && (!(data.dateStart || data.dateEnd) ||(moment(data.dateStart, 'DD.MM.YYYY').isSameOrBefore(l.date, 'day') && moment(data.dateEnd,'DD.MM.YYYY').isSameOrAfter(l.date,'day')))
          && (!(data.priceMin || data.priceMax) ||(l.price>=data.priceMin && l.price<=data.priceMax ))
          && (!(data.ratingMin || data.ratingMax) ||(l.rating>=data.ratingMin && l.rating<=data.ratingMax ))
        && (!(data.city?.length)|| l.city.includes(data.city) )
      }),
      totalItems: this.list.length,
    pageIndex:0,
      pageSize:10
    })
    // return this.http.get(this.path+'search/',{headers: ApiService.getHeaders(), params:data});
  }

  getById(id: number): Observable<Listing>{
    return this.http.get<Listing>(this.path+id, {headers: ApiService.getHeaders()})
  }

  public deleteListing(id: number): Observable<any>{
    return this.http.delete(this.path + id,{headers: ApiService.getHeaders()})
  }

}
