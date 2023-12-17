import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginControl =  new FormControl('', Validators.required)
  passwordControl =  new FormControl('', Validators.required)

  formGroup: FormGroup = new FormGroup({
    login: this.loginControl,
    password: this.passwordControl
  })

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  login() {
    this.userService.logIn(this.formGroup.getRawValue())
      .subscribe(data => {
        localStorage.setItem('currentUser',this.loginControl.value)
        localStorage.setItem("isHost", this.loginControl.value=='host'?'true':'false')
        localStorage.setItem("isAdmin", this.loginControl.value=='admin'?'true':'false')
        if (this.loginControl.value=='admin')
          this.router.navigate(['/admin']);
        else
          this.router.navigate(['/listings']);
        }, err => {
        this.snackBar.open(err?.message||'Wrong login or password', 'Error', {duration: 5000})
        }
      );
  }

  getMode(): string {
    let i: number;
    i = document.body.clientWidth;
    return   i >= 1139 ? 'desktop' : i >= 676 ? 'table' : 'mobile';
  }

}
