import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import * as moment from "moment";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Task} from "../model/task";
import {HelperService} from "./utils/helper.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  path = HelperService.ADDR + 'camunda/'
  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization','Bearer '+localStorage.getItem("currentUser"))
    return headers;
  }

  public getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.path+'task',{headers: AdminService.getHeaders()})
  }
  public complete(task: Task, approve: boolean): Observable<any>{
    return this.http.get<any>(this.path+'task/'+task.id+'?approve='+(approve?'true':'false'),{headers: AdminService.getHeaders()})
  }


}
