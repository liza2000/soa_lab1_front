import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HumanBeing, Team, WeaponType} from "../model/humanBeing";

@Injectable({
  providedIn: 'root'
})
export class TeamApiService {


  constructor(public http: HttpClient) { }

  path = 'api/heroes/';

  private static getHeaders(): HttpHeaders {

    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public saveTeam(team:any): Observable<any>{
    return this.http.post(this.path, team,{headers: TeamApiService.getHeaders()});
  }

  public updateTeam(id: number, team:any): Observable<any>{
    return this.http.put(this.path + id, team,{headers: TeamApiService.getHeaders()});
  }

  public getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.path,{headers: TeamApiService.getHeaders()});
  }

  getById(id: number): Observable<HumanBeing>{
    return this.http.get<HumanBeing>(this.path+id, {headers: TeamApiService.getHeaders()})
  }

  public deleteTeam(id: number): Observable<any>{
    return this.http.delete(this.path + id,{headers: TeamApiService.getHeaders()})
  }

  public search(realHeroOnly: boolean): Observable<HumanBeing[]>{
    return this.http.get<HumanBeing[]>(this.path+'search' + (realHeroOnly?'/real-hero-only':''),{headers: TeamApiService.getHeaders()});
  }

  public makeDepressive(teamId: number): Observable<any>{
    return this.http.post(this.path+'team/'+teamId+'/make-depressive',{},{headers: TeamApiService.getHeaders()})
  }

  public getTeamsBuHumanId(humanId: number): Observable<any>{
    return this.http.get(this.path+'teams-by-human/'+humanId)
  }

  public removeHumanFromTeam(humanId: number, teamId:number): Observable<any>{
   return  this.http.delete(this.path+teamId+'/'+humanId)
  }

  public addHumanToTeam(humanId: number, teamId:number): Observable<any>{
    return  this.http.put(this.path+teamId+'/'+humanId,"")
  }

}
