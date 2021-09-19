import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { HumanBeing, WeaponType} from "../../model/humanBeing";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {AppComponent} from "../../app.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-human-dialog',
  templateUrl: './human-form.component.html',
  styleUrls: ['./human-form.component.less']
})
export class HumanFormComponent implements OnInit {
//todo показывать результат апдейта
  human?: HumanBeing;

  result?: HumanBeing;

  name = new FormControl('',[Validators.required, v => v.value.trim().length==0?{blank: true}:null]);
  x = new FormControl('', [Validators.required, Validators.min(-706), Validators.max(AppComponent.FLOAT_MAX)]);
  y = new FormControl('', [Validators.required, Validators.min(-AppComponent.FLOAT_MAX), Validators.max(AppComponent.FLOAT_MAX)]);
  realHero = false;
  hasToothpick = false;
  impactSpeed = new FormControl('', [Validators.required, Validators.min(-741), Validators.max(AppComponent.FLOAT_MAX)]);
  soundtrackName = new FormControl('', Validators.required);
  minutesOfWaiting = new FormControl('', [Validators.required,Validators.min(-AppComponent.DOUBLE_MAX), Validators.max(AppComponent.DOUBLE_MAX)]);
  weaponType = new FormControl('', Validators.required);
  carName = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<HumanFormComponent>,
              public api:ApiService,
              public snackBar: MatSnackBar) {
    if (data)
      this.human = data;
  }



  formGroup: FormGroup = new FormGroup({
    name: this.name,
   coordinates: new FormGroup({
      x: this.x,
      y: this.y,
   }),
    impactSpeed: this.impactSpeed,
    soundtrackName: this.soundtrackName,
    minutesOfWaiting:this.minutesOfWaiting,
    weaponType: this.weaponType,
    car: new FormGroup({
      name: this.carName,
    })
  });

  ngOnInit(): void {
    if (this.human){
      this.formGroup.patchValue(this.human);
      this.realHero = this.human.realHero;
      this.hasToothpick = this.human.hasToothpick;
    }
  }


  close(value?: any) {
    if (value)
      this.dialogRef.close(value);
    else
      this.dialogRef.close()
  }

  saveHumanBeing() {
    if (this.formGroup.invalid) return;
    let data = {
      name: this.name.value.trim(),
      coordinates: {
        x: this.x.value,
        y: this.y.value,
      },
      realHero: this.realHero,
      hasToothpick: this.hasToothpick,
      impactSpeed: this.impactSpeed.value,
      soundtrackName:this.soundtrackName.value,
      minutesOfWaiting: this.minutesOfWaiting.value,
      weaponType: this.weaponType.value.toUpperCase().trim(),
      car: {
        name:this.carName.value
      }
    };
    if (!this.human)
      this.api.saveHumanBeing(data).subscribe(value => this.result = value, error => {
        this.snackBar.open(error.message, 'Error:', {duration: 5000})
      });
    else
      this.api.updateHumanBeing(this.human.id,data).subscribe(value => this.result = value, error => {
        this.snackBar.open(error.message, 'Error', {duration: 5000})
      });
  }

  getWeaponType(): string[]{
    return Object.keys(WeaponType)
  }

}
