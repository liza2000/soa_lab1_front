import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  loginControl =  new FormControl('', Validators.required)
  passwordControl =  new FormControl('', Validators.required)
  repeatPasswordControl: FormControl =  new FormControl('', [Validators.required, v=> v.value==this.passwordControl.value? {}:{notEqual: true} ])

  formGroup: FormGroup = new FormGroup({
    login: this.loginControl,
    password: this.passwordControl,
    repeatPassword: this.repeatPasswordControl
  })

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {

  }

  register() {
    this.userService.createAccount(this.formGroup.getRawValue()).subscribe(data => {
        this.router.navigate(['/login']);
      }, err => {

      this.snackBar.open(err?.message||'Failed to register', 'Error', {duration: 5000})
      }
    );
  }

  getMode(): string {
    let i: number;
    i = document.body.clientWidth;
    return   i >= 1139 ? 'desktop' : i >= 676 ? 'table' : 'mobile';
  }

}
