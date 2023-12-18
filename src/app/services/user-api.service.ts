import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Listing} from "../model/listing";
import {Observable, of} from "rxjs";
import * as moment from 'moment'
import {SearchRequest} from "../model/search-request";
import {ListingFull} from "../model/listing-full";
import {HelperService} from "./utils/helper.service";
@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(public http: HttpClient) { }

  weatherToken = ''
  path = HelperService.ADDR + 'listing/';

  public map = new Map()



  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization','Bearer '+localStorage.getItem("currentUser"))
    return headers;
  }



  public getListings(data:  SearchRequest): Observable<any>{
    return this.http.post<any>(this.path+'search',data,{headers: UserApiService.getHeaders()});
  }

  getById(id: number): Observable<ListingFull>{
    // return of ({id: 1, city:'Moscow', price: 100, name: 'Persik', rating: 5, host: ({name: 'Mama', email: 'pipi@mar', phone: '88005553535', hostRating:5}) as Host, review: [{reviewerName: 'Petya', comments:'Nice'} as Review,{reviewerName: 'Petya', comments:'Nice'} as Review]})
    return this.http.get<ListingFull>(this.path+id, {headers: UserApiService.getHeaders()})
  }


  bookListing(id: number,data:any): Observable<any>{
    return this.http.post<any>(this.path+id+'/book',data,{headers: UserApiService.getHeaders()});
  }


  public deleteListing(id: number): Observable<any>{
    return this.http.delete(this.path + id,{headers: UserApiService.getHeaders()})
  }

  removeBooking(user: string, listing: Listing) {
    if (this.map.has(user))
      this.map.set(user, this.map.get(user).filter((l: Listing)=>l!=listing))

    return of (true)
  }

  getCityData(city: string): Observable<any> {
   return   this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.weatherToken}`)
  }

  getWeatherData(lat: number, lon: number, date: Date): Observable<any> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lang=ru&lat=${lat}&lon=${lon}&appid=${this.weatherToken}`)
  }


  // public getBookedListings(data: any): Observable<any>{
  //   return of ({list: this.map.get(localStorage.getItem('currentUser')||'')?.filter((l:Listing) => {
  //       return (!(data.name?.length)|| l.name.includes(data.name))
  //         && (!(data.dateStart || data.dateEnd) ||(moment(data.dateStart, 'DD.MM.YYYY').isSameOrBefore(l.date, 'day') && moment(data.dateEnd,'DD.MM.YYYY').isSameOrAfter(l.date,'day')))
  //         && (!(data.priceMin || data.priceMax) ||(l.price>=data.priceMin && l.price<=data.priceMax ))
  //         && (!(data.ratingMin || data.ratingMax) ||(l.rating>=data.ratingMin && l.rating<=data.ratingMax ))
  //         && (!(data.city?.length)|| l.city.includes(data.city) )
  //     }) || [],
  //     totalItems: this.list.length,
  //     pageIndex:0,
  //     pageSize:10
  //   })
  //   // return this.http.get(this.path+'search/',{headers: ApiService.getHeaders(), params:data});
  // }

}
