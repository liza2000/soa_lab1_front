import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HumanApiService} from "../../services/human-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../../app.component";
import {FormControl, Validators} from "@angular/forms";
import {HumanBeing, RequestType, WeaponType} from "../../model/humanBeing";
import {HelperService} from "../../services/utils/helper.service";
@Component({
  selector: 'app-parameter-form',
  templateUrl: './parameter-form.component.html',
  styleUrls: ['./parameter-form.component.less']
})
export class ParameterFormComponent implements OnInit {

  result?: any;
  results?: HumanBeing[];
  request: RequestType = RequestType.GET_BY_ID;
  constructor(@Inject(MAT_DIALOG_DATA) public data:RequestType,
              public dialogRef: MatDialogRef<ParameterFormComponent>,
              public helper: HelperService,
              public api: HumanApiService,
              public snackBar: MatSnackBar) {
    if (data)
      this.request = data;
  }
  soundtrackName = new FormControl('', Validators.required);
  minutesOfWaiting = new FormControl('', [Validators.required,Validators.min(-AppComponent.DOUBLE_MAX), Validators.max(AppComponent.DOUBLE_MAX)]);
  weaponType = new FormControl('', Validators.required);
  id = new FormControl('', [Validators.required,Validators.min(-AppComponent.LONG_MAX), Validators.max(AppComponent.LONG_MAX)]);

  ngOnInit(): void {

  }

  getWeaponType(): string[]{
    return Object.keys(WeaponType)
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

  public getHumanBeingsBySoundtrackNameStarts(){
    if (this.soundtrackName.invalid) return;
    this.api.getHumanBeingsBySoundtrackNameStarts(this.soundtrackName.value).subscribe(value => this.results = value, e => this.snackBar.open(e.error,'Error', {duration: 5000}))
  }
  public getCountByWeaponTypeLess(){
    if (this.weaponType.invalid) return;
    this.api.getCountByWeaponTypeLess(this.weaponType.value).subscribe(value => this.result = value, e => this.snackBar.open(e.error,'Error', {duration: 5000}))
   }
  public deleteAllByMinutesOFWaiting(){
    if (this.minutesOfWaiting.invalid) return;
    this.api.deleteAllByMinutesOFWaiting(this.minutesOfWaiting.value).subscribe(value => {

      this.snackBar.open(value,'Success', {panelClass: 'success-snackbar', duration: 5000});
      this.close(value)
      },
        e => this.snackBar.open(e.error,'Error', {duration: 5000}))
  }
}
