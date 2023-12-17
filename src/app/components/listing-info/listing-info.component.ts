import {Component, Inject, OnInit} from '@angular/core';
import {ListingFull} from "../../model/listing-full";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserApiService} from "../../services/user-api.service";
import {HostApiService} from "../../services/host-api.service";
import {HelperService} from "../../services/utils/helper.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-listing-info',
  templateUrl: './listing-info.component.html',
  styleUrls: ['./listing-info.component.less']
})
export class ListingInfoComponent implements OnInit {
  listing: ListingFull;
  weatherData: any

  startDate = new Date();
  withButtons = false
  endDate = new Date()
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ListingInfoComponent>,
              public api:UserApiService,
              public hostApi: HostApiService,
              public helper: HelperService,
              public snackBar: MatSnackBar) {

      this.listing = data.listing;
      this.startDate = data.startDate
      this.endDate = data.endDate
      this.withButtons = data.withButtons
      this.getWeatherData()

  }

  ngOnInit(): void {
  }

  getWeatherData() {
    this.api.getCityData(this.listing?.city || '').subscribe( (coords: any) => {
      this.api.getWeatherData(coords[0].lat,coords[0].lon, this.startDate).subscribe(d=>{
        this.weatherData = d.weather[0].description;
      })

    })
  }
  close(value?: any) {
    if (value)
      this.dialogRef.close(value);
    else
      this.dialogRef.close()
  }
  bookListing() {
    let data = {
      startDate: this.helper.format(this.startDate),
      endDate: this.helper.format(this.endDate)
    }
    this.api.bookListing(this.listing.id,data).subscribe(v=> {
      this.snackBar.open("Listing successfully booked", 'Success', {duration: 5000, panelClass: 'success-snackbar'});
      this.close(v)
    }, error => {
      this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'});
      this.close()
    })
  }

}
