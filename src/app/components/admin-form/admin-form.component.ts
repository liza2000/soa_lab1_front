import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserApiService} from "../../services/user-api.service";
import {HostApiService} from "../../services/host-api.service";
import {HelperService} from "../../services/utils/helper.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Task} from '../../model/task'

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.less']
})
export class AdminFormComponent implements OnInit {


  task: Task;
  isHost = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AdminFormComponent>,
              public api:AdminService,
              public helper: HelperService,
              public snackBar: MatSnackBar) {
    this.task = data
  }

  ngOnInit(): void {
  }

  close(value?: any) {
    if (value)
      this.dialogRef.close(value);
    else
      this.dialogRef.close()
  }

  complete(approve: boolean){
    this.api.complete(this.task,approve).subscribe(v=> {
         this.snackBar.open(approve?'Approved':'Not approved','Success:', {duration:5000})
        this.close()
      },
      error => this.snackBar.open(error.error,'Error:', {duration:5000}))
  }

}
