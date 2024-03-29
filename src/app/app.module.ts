import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatCardModule} from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { TableComponent } from './components/table/table.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {MY_FORMATS, MyDateAdapter} from "./providers/my-date-adapter";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMatRangeSliderModule} from "ngx-mat-range-slider";
import { HumanFormComponent } from './components/human-form/human-form.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HumanApiService} from "./services/human-api.service";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {CdkTableModule} from "@angular/cdk/table";
import { ParameterFormComponent } from './components/parameter-form/parameter-form.component';
import { TeamsComponent } from './components/teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ParameterFormComponent,
    HumanFormComponent,
    ParameterFormComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatRangeSliderModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CdkTableModule
  ],
  exports:[],
  entryComponents: [HumanFormComponent],
  providers: [
    {provide: HumanApiService, useClass: HumanApiService},
    {provide: DateAdapter, useClass: MyDateAdapter},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {clickAction: "check"}  as MatCheckboxDefaultOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
