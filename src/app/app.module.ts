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
import { ListingFormComponent } from './components/listing-form/listing-form.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {UserApiService} from "./services/user-api.service";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {CdkTableModule} from "@angular/cdk/table";
import { ParameterFormComponent } from './components/parameter-form/parameter-form.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { RegisterComponent } from './components/register/register.component';
import {Guard} from "./guard.service";
import { BookingsComponent } from './components/bookings/bookings.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';

const appRoutes: Routes = [
  {
    path: 'listings',
    component: TableComponent,
    canActivate: [Guard]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [Guard]
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [Guard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [Guard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [Guard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
  // {
  //   path: 'admin',
  //   component: AdminComponent
  // },
  // {
  //   path: 'change-book',
  //   component: ChangeBookComponent
  // }
];
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ParameterFormComponent,
    ListingFormComponent,
    ParameterFormComponent,
    LoginComponent,
    RegisterComponent,
    BookingsComponent,
    AdminPageComponent,
    AdminFormComponent
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
    CdkTableModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[],
  entryComponents: [ListingFormComponent],
  providers: [
    {provide: UserApiService, useClass: UserApiService},
    {provide: DateAdapter, useClass: MyDateAdapter},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {clickAction: "check"}  as MatCheckboxDefaultOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
