import { Component, OnInit } from '@angular/core';
import {Listing, RequestType} from "../../model/listing";
import {AppComponent} from "../../app.component";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../services/utils/helper.service";
import {UserApiService} from "../../services/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ListingFormComponent} from "../listing-form/listing-form.component";
import {ParameterFormComponent} from "../parameter-form/parameter-form.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.less']
})
export class BookingsComponent implements OnInit {

  listings: Listing[] = [];
  columns = ['position','name', 'price','rating','city','date', 'buttons'];
  FLOAT_MAX=AppComponent.FLOAT_MAX;
  LONG_MAX=AppComponent.LONG_MAX;
  name?: string;
  priceStart?:number;
  priceEnd?: number;
  ratingStart?:number;
  ratingEnd?:number;
  dateStart?:Date|null;
  dateEnd?:Date|null;
  city?:string;



  columnsToSort: string[] = [];

  pageSizeOptions = [5,10,15];
  limit = 10;
  pageIndex = 0;
  length = 0;

  isHost = false


  constructor(public dialog: MatDialog, public helper: HelperService, public api: UserApiService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.isHost = localStorage.getItem("isHost") == 'true'
    this.getListings();
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
  getListings() {
    let  sort = this.columnsToSort.slice();
    let data = {
      sort: sort.reverse(),
      name:(!this.name||this.name==='')?[]:this.name,
      priceMin:  this.priceStart==null?-this.LONG_MAX:this.priceStart,
      priceMax:  this.priceEnd==null?this.LONG_MAX:this.priceEnd,
      ratingMin: this.ratingStart==null?-this.LONG_MAX:this.ratingStart,
      ratingMax: this.ratingEnd==null?this.LONG_MAX:this.ratingEnd,
      city: (!this.city||this.city==='')?[]:this.city,
      limit: this.limit,
      dateStart:this.helper.format(this.dateStart),
      dateEnd:this.helper.format(this.dateEnd),
      pageIndex: this.pageIndex
    };
    this.api.getBookedListings(data).subscribe(v => {
        this.listings = v.list.slice() as Listing[];
        this.length = v.totalItems;
        this.pageIndex = v.pageIndex;
        this.limit = v.pageSize;
      },
      e => {
        this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})});
  }
  openListingForm(listing?: Listing) {
    let data = {
      listing: listing,
      isHost: this.isHost
    }
    this.dialog.open(ListingFormComponent, {data: data }).afterClosed().subscribe(v => {
      if (v) this.getListings()}
    )
  }

  openForResult(request: RequestType) {
    this.dialog.open(ParameterFormComponent, {data: request}).afterClosed().subscribe(v => {
      if (v) this.getListings()}
    );
  }


  deleteListing(listing: Listing) {
    return this.api.deleteListing(listing.id).subscribe( v => {
      this.snackBar.open(v,'Success',{duration: 5000, direction: "ltr", panelClass: 'success-snackbar'});
      this.getListings()}, error => {
      this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})})
  }



  setSortData(e: any) {
    this.columnsToSort = this.columnsToSort.filter( s => s.split('_',2)[1]!==e.active);
    if (e.direction==='') return;
    if (e.direction==='asc')
      this.columnsToSort.push('asc_'+e.active);
    else this.columnsToSort.push('desc_'+e.active);
    this.getListings()
  }


  getRequestType(){
    return RequestType
  }


  setPageOptions(e: PageEvent) {
    this.limit = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getListings()
  }


  setNumFilter(input: HTMLInputElement,$event: KeyboardEvent, v?: number) {
    if ($event.key != '.' && $event.key != ',')
      input.value = v+''
  }

  logOut() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isHost")
    this.router.navigate(['/login'])
  }

  openAllListings() {
    this.router.navigate(['/listings'])
  }

  removeBooking(listing: Listing) {
    this.api.removeBooking(localStorage.getItem("currentUser") || '', listing)
      .subscribe(d=>this.getListings())
  }
}
