import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Listing} from "../model/listing";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as moment from "moment/moment";

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
      "info": "Общий душ, телевизор в номере, кондиционер",
      "city": "Москва",
      "date": new Date("2023-11-21T15:21:05.743Z")
    },
    {
      id: 2,
      "name": "Ласточка",
      "price": 2000,
      "rating": 0,
      "info": "Wi-Fi, телевизор, душ в номере",
      "city": "Санкт-Петербург",
      "date": new Date("2023-11-21T15:21:39.379Z")
    },
    {
      id: 3,
      "name": "Travelto",
      "price": 1000,
      "rating": 0,
      "info": "Чайник в номере, Wi-Fi, Общий Душ",
      "city": "Тверь",
      "date": new Date("2023-11-21T15:23:56.074Z")
    }
  ]

  path = "listing/"
  constructor(private http: HttpClient) { }


  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }



  public getListings(data: any): Observable<any>{
    console.log(this.list)
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

  public saveListing(listing:any): Observable<any>{
    listing.date = new Date()
    this.list.push(listing)
    return of(listing)
    // return this.http.post(this.path, listing,{headers: ApiService.getHeaders()});
  }

  public updateListing(id: number, listing:any): Observable<any>{
    return this.http.put(this.path + id, listing,{headers: HostApiService.getHeaders()});
  }
}
