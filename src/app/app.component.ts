import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public static INT_MAX=2147483647;
  public static  LONG_MAX=1000000000;
  public static FLOAT_MAX=3.40282347E+38;
  public static DOUBLE_MAX=1.7976931348623157E308;

  title = 'lab1-front';
}
