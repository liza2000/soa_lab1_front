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
    let data = {
      login: this.loginControl.value,
      password: this.passwordControl.value
    }
    this.userService.logIn(data)
      .subscribe(data => {
        localStorage.setItem('currentUser',data.token)
        localStorage.setItem("role", data.role)
        if (data.role=='ADMIN')
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
