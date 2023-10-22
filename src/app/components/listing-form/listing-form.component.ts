import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Listing} from "../../model/listing";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {AppComponent} from "../../app.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HelperService} from "../../services/utils/helper.service";

@Component({
  selector: 'app-listing-dialog',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.less']
})
export class ListingFormComponent implements OnInit {
  listing?: Listing;

  result?: Listing;

  name = new FormControl('',[Validators.required, v => v.value.trim().length==0?{blank: true}:null]);
  price = new FormControl('', [Validators.required]);
  rating = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required, v => v.value.trim().length==0?{blank: true}:null]);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ListingFormComponent>,
              public api:ApiService,
              public helper: HelperService,
              public snackBar: MatSnackBar) {
    if (data)
      this.listing = data;
  }



  formGroup: FormGroup = new FormGroup({
    name: this.name,
    price: this.price,
    rating: this.rating,
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
      rating: this.rating.value,
      city:  this.city.value,
    };
    if (!this.listing)
      this.api.saveListing(data).subscribe(value => this.result = value, error => {
        this.snackBar.open(error.error, 'Error:', {duration: 5000, panelClass: 'error-snackbar'})
      });
    else
      this.api.updateListing(this.listing.id,data).subscribe(value =>{
        this.snackBar.open(value, 'Success', {duration: 5000, panelClass: 'success-snackbar'});
        this.close(value)
      }, error => {
        this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})
      });
  }


}
