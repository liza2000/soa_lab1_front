import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Listing} from "../../model/listing";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserApiService} from "../../services/user-api.service";
import {AppComponent} from "../../app.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HelperService} from "../../services/utils/helper.service";
import {verifyHostBindings} from "@angular/compiler";
import {HostApiService} from "../../services/host-api.service";
import {ListingFull} from "../../model/listing-full";

@Component({
  selector: 'app-listing-dialog',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.less']
})
export class ListingFormComponent implements OnInit {
  listing?: Listing;

  result?: Listing;
  weatherData: any

  name = new FormControl('',[Validators.required, v => v.value.trim().length==0?{blank: true}:null]);
  price = new FormControl('', [Validators.required]);
  info = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required, v => v.value.trim().length==0?{blank: true}:null]);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ListingFormComponent>,
              public api:UserApiService,
              public hostApi: HostApiService,
              public helper: HelperService,
              public snackBar: MatSnackBar) {
    if (data) {
      this.listing = data.listing;
    }
  }



  formGroup: FormGroup = new FormGroup({
    name: this.name,
    price: this.price,
    city: this.city,
  });

  ngOnInit(): void {
    if (this.listing){
      this.formGroup.patchValue(this.listing);
    }
  }


  close(value?: any) {
    if (value)
      this.dialogRef.close(value);
    else
      this.dialogRef.close()
  }

  saveListing() {
    if (this.formGroup.invalid) return;
    let data = {
      name: this.name.value.trim(),
      price: this.price.value,
      city:  this.city.value,
    };
    if (!this.listing)
      this.hostApi.saveListing(data).subscribe(value => {
        this.result = value
        this.snackBar.open("Created successfully", 'Success:', {duration: 5000, panelClass: 'success-snackbar'})
      }, error => {
        this.snackBar.open(error.error, 'Error:', {duration: 5000, panelClass: 'error-snackbar'})
      });
    // else
      // this.hostApi.updateListing(this.listing.id,data).subscribe(value =>{
      //   this.snackBar.open(value, 'Success', {duration: 5000, panelClass: 'success-snackbar'});
      //   this.close(value)
      // }, error => {
      //   this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})
      // });
  }



}
