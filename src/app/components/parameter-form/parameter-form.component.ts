import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserApiService} from "../../services/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../../app.component";
import {FormControl, Validators} from "@angular/forms";
import {Listing, RequestType} from "../../model/listing";
import {HelperService} from "../../services/utils/helper.service";
@Component({
  selector: 'app-parameter-form',
  templateUrl: './parameter-form.component.html',
  styleUrls: ['./parameter-form.component.less']
})
export class ParameterFormComponent implements OnInit {

  result?: any;
  results?: Listing[];
  request: RequestType = RequestType.GET_BY_ID;
  constructor(@Inject(MAT_DIALOG_DATA) public data:RequestType,
              public dialogRef: MatDialogRef<ParameterFormComponent>,
              public helper: HelperService,
              public api: UserApiService,
              public snackBar: MatSnackBar) {
    if (data)
      this.request = data;
  }
  city = new FormControl('', Validators.required);

  id = new FormControl('', [Validators.required,Validators.min(-AppComponent.LONG_MAX), Validators.max(AppComponent.LONG_MAX)]);

  ngOnInit(): void {

  }



  getRequestType() {
    return RequestType
  }

  close(value?: any) {
    if (value)
      this.dialogRef.close(value);
    else
      this.dialogRef.close()
  }

  getById() {
    if (this.id.invalid) return;
    this.api.getById(this.id.value).subscribe( value => this.result = value, e => this.snackBar.open(e.error,'Error', {duration: 5000}))
  }


}
