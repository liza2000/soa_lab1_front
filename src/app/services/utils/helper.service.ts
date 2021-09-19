import { Injectable } from '@angular/core';
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  setNum(limit: number, v?:number){
    if (!v) return v;
    v = Math.min(v,limit);
    v = Math.max(v, -limit);
    return v
  }

  format(date?: Date | null){
    if (date)
    return moment(date).format("DD.MM.yyyy");
    return null
  }
}
