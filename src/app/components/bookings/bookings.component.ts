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
import {ListingInfoComponent} from "../listing-info/listing-info.component";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.less']
})
export class BookingsComponent implements OnInit {

  listings: Listing[] = [];
  columns = ['position','name', 'price','rating','city', 'buttons'];
  FLOAT_MAX=AppComponent.FLOAT_MAX;
  LONG_MAX=AppComponent.LONG_MAX;



  constructor(public dialog: MatDialog, public helper: HelperService, public api: UserApiService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getListings();
  }


  getListings() {

    // this.api.getBookedListings().subscribe(v => {
    //     this.listings = v.list.slice() as Listing[];
    //   },
    //   e => {
    //     this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})});
  }
  openListingInfo(listing: Listing){
    this.api.getById(listing.id).subscribe(listingFull=>{

      let data = {
        listing: listingFull
      }
      this.dialog.open(ListingInfoComponent, {data: data})

    })
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


  getRequestType(){
    return RequestType
  }

  logOut() {
    localStorage.removeItem("currentUser")
    this.router.navigate(['/login'])
  }

  openAllListings() {
    this.router.navigate(['/listings'])
  }

  removeBooking(listing: Listing) {
    // this.api.removeBooking(localStorage.getItem("currentUser") || '', listing)
    //   .subscribe(d=>this.getListings())
  }
}
