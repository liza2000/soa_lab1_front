import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import * as moment from "moment";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  path = 'task/'
  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public getTasks(): Observable<Task[]>{
     return this.http.get<Task[]>(this.path,{headers: AdminService.getHeaders()})
       .pipe(catchError(e =>this.openSnackBarError(e)));
  }

  openSnackBarError(e: string): Observable<Task[]>{
    this.snackBar.open(e, 'Error', {duration: 5000})
    return of([])
  }

}
