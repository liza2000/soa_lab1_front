import {Component, OnInit} from '@angular/core';
import {Car, Coordinates, HumanBeing, RequestType, WeaponType} from "../../model/humanBeing";
import {HelperService} from "../../services/utils/helper.service";
import {MatDialog} from "@angular/material/dialog";
import {HumanFormComponent} from "../human-form/human-form.component";
import {HumanApiService} from "../../services/human-api.service";
import {PageEvent} from "@angular/material/paginator";
import {AppComponent} from "../../app.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ParameterFormComponent} from "../parameter-form/parameter-form.component";
import {TeamsComponent} from "../teams/teams.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})


export class TableComponent implements OnInit {
  humans: HumanBeing[] = [];
  columns = ['position','name', 'coordinatesX','coordinatesY','creationDate','realHero','hasToothpick','impactSpeed','soundtrackName','minutesOfWaiting','weaponType', 'carName', 'buttons'];
  FLOAT_MAX = AppComponent.FLOAT_MAX;
  DOUBLE_MAX = AppComponent.DOUBLE_MAX;
  name?: string;
  xStart?:number;
  xEnd?: number;
  yStart?:number;
  yEnd?:number;
  dateStart?:Date;
  dateEnd?:Date;
  realHero?: string;
  hasToothpick?: string;
  impactSpeedStart?:number;
  impactSpeedEnd?:number;
  soundtrackName?:string;
  minutesOfWaitingStart?:number;
  minutesOfWaitingEnd?:number;
  weaponTypes:WeaponType[] = [];
  car?: string;



  columnsToSort: string[] = [];

  pageSizeOptions = [5,10,15];
  limit = 10;
  pageIndex = 0;
  length = 0;


  constructor(public dialog: MatDialog, public helper: HelperService, public api: HumanApiService, public snackBar: MatSnackBar) { }

    ngOnInit(): void {
    this.getHumans();
  }

  getFilterParameter(a?: any, b?:any){
    if (a==undefined && b==undefined)
      return [];
    if (a==undefined)
      return ['',b];
    if (b==undefined)
      return [a,''];
    if (a==b)
      return a;
    return [a,b];
  }
  getHumans() {
    let  sort = this.columnsToSort.slice();
    let data = {
        sort: sort.reverse(),
        name:(!this.name||this.name==='')?[]:this.name,
        coordinatesx:  this.getFilterParameter(this.xStart,this.xEnd),
        coordinatesy: this.getFilterParameter(this.yStart,this.yEnd),
        'creation-date':this.getFilterParameter(this.helper.format(this.dateStart),this.helper.format(this.dateEnd)),
        'impact-speed':this.getFilterParameter(this.impactSpeedStart,this.impactSpeedEnd),
        'minutes-of-waiting': this.getFilterParameter(this.minutesOfWaitingStart,this.minutesOfWaitingEnd),
        'weapon-type': this.weaponTypes,
        'real-hero': this.getFilterParameter(this.realHero, this.realHero),
        'has-toothpick': this.getFilterParameter(this.hasToothpick, this.hasToothpick),
        'soundtrack-name': (!this.soundtrackName||this.soundtrackName==='')?[]:this.soundtrackName,
        'carname': (!this.car||this.car==='')?[]:this.car,
        limit: this.limit,
        'page-index': this.pageIndex
    };
    this.api.getHumanBeings(data).subscribe(v => {
       this.humans = v.list as HumanBeing[];
       this.length = v.totalItems;
       this.pageIndex = v.pageIndex;
       this.limit = v.pageSize;
    },
      e => {
      this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})});
  }
  openHumanBeingForm(human?: HumanBeing) {
    this.dialog.open(HumanFormComponent, {data: human }).afterClosed().subscribe(v => {
      if (v) this.getHumans()}
    )
  }

  openForResult(request: RequestType) {
    this.dialog.open(ParameterFormComponent, {data: request}).afterClosed().subscribe(v => {
      if (v) this.getHumans()}
    );
  }


  openTeams(human?: HumanBeing) {
    if (!human)
      this.dialog.open(TeamsComponent).afterClosed().subscribe(v=>{
        if (v)
          this.getHumans();
      });
    else this.dialog.open(TeamsComponent, {data: human.id}).afterClosed().subscribe(v=>{
      if (v)
        this.getHumans();
    })
  }

  deleteHumanBeing(band: HumanBeing) {
    return this.api.deleteHumanBeing(band.id).subscribe( v => {
      this.snackBar.open(v,'Success',{duration: 5000, direction: "ltr", panelClass: 'success-snackbar'});
      this.getHumans()}, error => {
      this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})})
  }



  setSortData(e: any) {
    this.columnsToSort = this.columnsToSort.filter( s => s.split('_',2)[1]!==e.active);
    if (e.direction==='') return;
    if (e.direction==='asc')
      this.columnsToSort.push('asc_'+e.active);
    else this.columnsToSort.push('desc_'+e.active);
    this.getHumans()
  }


  getWeaponType(): string[]{
    return Object.keys(WeaponType)
  }
  getRequestType(){
    return RequestType
  }


  setPageOptions(e: PageEvent) {
    this.limit = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getHumans()
  }


  setNumFilter(input: HTMLInputElement,$event: KeyboardEvent, v?: number) {
    if ($event.key != '.' && $event.key != ',')
      input.value = v+''
  }

}
