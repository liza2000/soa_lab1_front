import {Component, OnInit} from '@angular/core';
import {Car, Coordinates, HumanBeing, WeaponType} from "../../model/humanBeing";
import {HelperService} from "../../services/utils/helper.service";
import {MatDialog} from "@angular/material/dialog";
import {HumanFormComponent} from "../human-form/human-form.component";
import {ApiService} from "../../services/api.service";
import {PageEvent} from "@angular/material/paginator";
import {AppComponent} from "../../app.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  humans: HumanBeing[] = [];
  columns = ['position','name', 'coordinatesX','coordinatesY','creationDate','realHero','hasToothpick','impactSpeed','soundtrackName','minutesOfWaiting','weaponType', 'carName'];
  FLOAT_MAX=AppComponent.FLOAT_MAX;
  DOUBLE_MAX=AppComponent.DOUBLE_MAX;
  name?: string;
  xStart?:number;
  xEnd?: number;
  yStart?:number;
  yEnd?:number;
  dateStart?:Date|null;
  dateEnd?:Date|null;
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


  constructor(public dialog: MatDialog, public helper: HelperService, public api: ApiService, public snackBar: MatSnackBar) { }

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
    let data = {
        sort: this.columnsToSort.reverse(),
        name:(!this.name||this.name==='')?[]:this.name,
        coordinatesX:  this.getFilterParameter(this.xStart,this.xEnd),
        coordinatesY: this.getFilterParameter(this.yStart,this.yEnd),
        date:this.getFilterParameter(this.helper.format(this.dateStart),this.helper.format(this.dateEnd)),
        impactSpeed:this.getFilterParameter(this.impactSpeedStart,this.impactSpeedEnd),
        minutesOfWaiting: this.getFilterParameter(this.minutesOfWaitingStart,this.minutesOfWaitingEnd),
        weaponType: this.weaponTypes,
        realHero: this.getFilterParameter(this.realHero, this.realHero),
        hasToothpick: this.getFilterParameter(this.hasToothpick),
        soundtrackName: (!this.soundtrackName||this.soundtrackName==='')?[]:this.soundtrackName,
        carName: (!this.car||this.car==='')?[]:this.car,
        limit: this.limit,
        offset: this.pageIndex * this.limit
    };
    this.api.getHumanBeings(data).subscribe(v => {
      console.log(v);
       this.humans = v.list as HumanBeing[];
       this.length = v.length
    });
  }
  openHumanBeingForm(vehicle?: HumanBeing) {
    this.dialog.open(HumanFormComponent, {data: vehicle}).afterClosed().subscribe(v => {if (v) this.getHumans();}
    )
  }
  deleteHumanBeing(band: HumanBeing) {
    return this.api.deleteHumanBeing(band.id).subscribe( v => {
      this.snackBar.open(v,'Success',{duration: 5000, direction: "ltr"});
      this.getHumans()})
  }



  setSortData(e: any) {
    this.columnsToSort = this.columnsToSort.filter( s => s.slice(1)!==e.active);
    if (e.direction==='') return;
    if (e.direction==='asc')
      this.columnsToSort.push('a'+e.active);
    else this.columnsToSort.push('d'+e.active);
    this.getHumans()
  }


  getWeaponType(): string[]{
    return Object.keys(WeaponType)
  }


  setPageOptions(e: PageEvent) {
    this.limit = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getHumans()
  }


}