import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Listing} from "../model/listing";
import {Observable, of} from "rxjs";
import * as moment from 'moment'
import {SearchRequest} from "../model/search-request";
@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(public http: HttpClient) { }

  weatherToken = ''
  path = 'listing/';

  public map = new Map()

  public list: Listing[] = [
    {
      id: 1,
      "name": "Ромашка",
      "price": 1500,
      "rating": 0,
      "info": "Общий душ, телевизор в номере, кондиционер",
      "city": "Москва",
      "date": new Date()
    },
    {
      id: 2,
      "name": "Ласточка",
      "price": 2000,
      "rating": 0,
      "info": "Wi-Fi, телевизор, душ в номере",
      "city": "Санкт-Петербург",
      "date": new Date()
    },
    {
      id: 3,
      "name": "Travelto",
      "price": 1000,
      "rating": 0,
      "info": "Чайник в номере, Wi-Fi, Общий Душ",
      "city": "Тверь",
      "date": new Date()
    }
  ]

  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }



  public getListings(data:  SearchRequest): Observable<any>{
    console.log(this.list)
    return of ({list: this.list.filter(l => {
        return (!(data.name?.length)|| l.name.includes(data.name))
        && (!(data.startDate || data.endDate) ||(moment(data.startDate, 'DD.MM.YYYY').isSameOrBefore(l.date, 'day') && moment(data.endDate,'DD.MM.YYYY').isSameOrAfter(l.date,'day')))
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

  public getBookedListings(data: any): Observable<any>{
    return of ({list: this.map.get(localStorage.getItem('currentUser')||'')?.filter((l:Listing) => {
        return (!(data.name?.length)|| l.name.includes(data.name))
          && (!(data.dateStart || data.dateEnd) ||(moment(data.dateStart, 'DD.MM.YYYY').isSameOrBefore(l.date, 'day') && moment(data.dateEnd,'DD.MM.YYYY').isSameOrAfter(l.date,'day')))
          && (!(data.priceMin || data.priceMax) ||(l.price>=data.priceMin && l.price<=data.priceMax ))
          && (!(data.ratingMin || data.ratingMax) ||(l.rating>=data.ratingMin && l.rating<=data.ratingMax ))
          && (!(data.city?.length)|| l.city.includes(data.city) )
      }) || [],
      totalItems: this.list.length,
      pageIndex:0,
      pageSize:10
    })
    // return this.http.get(this.path+'search/',{headers: ApiService.getHeaders(), params:data});
  }


  bookListing(user: string, listing?: Listing){
    if (this.map.has(user))
      this.map.get(user).push(listing)
    else
      this.map.set(user,[listing])
    return of (true)
  }

  getById(id: number): Observable<Listing>{
    return this.http.get<Listing>(this.path+id, {headers: UserApiService.getHeaders()})
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


}
