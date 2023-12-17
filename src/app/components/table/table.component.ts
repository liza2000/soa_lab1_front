import {Component, OnInit} from '@angular/core';
import { Listing, RequestType} from "../../model/listing";
import {HelperService} from "../../services/utils/helper.service";
import {MatDialog} from "@angular/material/dialog";
import {ListingFormComponent} from "../listing-form/listing-form.component";
import {UserApiService} from "../../services/user-api.service";
import {PageEvent} from "@angular/material/paginator";
import {AppComponent} from "../../app.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ParameterFormComponent} from "../parameter-form/parameter-form.component";
import {Router} from "@angular/router";
import {SearchRequest} from "../../model/search-request";
import {ListingInfoComponent} from "../listing-info/listing-info.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})


export class TableComponent implements OnInit {
  listings: Listing[] = [];
  columns = ['position','name', 'price','rating','city', 'buttons'];
  FLOAT_MAX=AppComponent.FLOAT_MAX;
  LONG_MAX=AppComponent.LONG_MAX;
  priceStart?:number;
  priceEnd?: number
  dateStart = new Date();
  dateEnd = this.helper.addDate(this.dateStart, 7);
  city?:string;



  columnsToSort: string[] = [];

  role = 'USER'


  constructor(public dialog: MatDialog, public helper: HelperService, public api: UserApiService, public snackBar: MatSnackBar, private router: Router) { }

    ngOnInit(): void {
     this.role = localStorage.getItem("role") || 'USER'
     this.getListings();
  }

  getListings() {
    let data = new SearchRequest(
          this.priceStart==null?-this.LONG_MAX:this.priceStart,
        this.priceEnd==null?this.LONG_MAX:this.priceEnd,
         (!this.city||this.city==='')?'':this.city,
        this.helper.format(this.dateStart),
        this.helper.format(this.dateEnd))

    this.api.getListings(data).subscribe(v => {
       this.listings = v.slice() as Listing[];
    },
      e => {
      this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})});
    this.listings = UserApiService.list
  }
  openListingForm(listing?: Listing) {
      let data = {
        listing: listing,
        role: this.role,
        startDate: this.dateStart,
        endDate: this.dateEnd
      }
      this.dialog.open(ListingFormComponent, {data: data }).afterClosed().subscribe(v => {
        if (v) this.getListings()}
      )
  }

  openListingInfo(listing: Listing){
    this.api.getById(listing.id).subscribe(listingFull=>{

      let data = {
        listing: listingFull,
        startDate: this.dateStart,
        endDate: this.dateEnd,
        withButtons: true
      }
      this.dialog.open(ListingInfoComponent, {data: data}).afterClosed().subscribe(v => {
          if (v) this.getListings()
        }
      )

    })
  }


  deleteListing(listing: Listing) {
    // return this.api.deleteListing(listing.id).subscribe( v => {
    //   this.snackBar.open(v,'Success',{duration: 5000, direction: "ltr", panelClass: 'success-snackbar'});
    //   this.getListings()}, error => {
    //   this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})})
  }


  setNumFilter(input: HTMLInputElement,$event: KeyboardEvent, v?: number) {
    if ($event.key != '.' && $event.key != ',')
      input.value = v+''
  }

  logOut() {
    localStorage.removeItem("currentUser")
    this.router.navigate(['/login'])
  }

  openMyBookings() {
    this.router.navigate(['/bookings'])
  }
}
