import { Injectable } from '@angular/core';
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  public static ADDR = ''
  setNum(limit: number, v?:number){
    if (!v) return v;
    v = Math.min(v,limit);
    v = Math.max(v, -limit);
    return v
  }

  format(date?: Date | null){
    if (date)
    return moment(date).format("DD-MM-yyyy");
    return ''
  }

  addDate(date: Date, count: number) {
    return moment(date).add(count, "days").toDate()
  }
}
