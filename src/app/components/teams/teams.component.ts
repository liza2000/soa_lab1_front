import { Component, OnInit } from '@angular/core';
import {TeamApiService} from "../../services/team-api.service";
import {Team} from "../../model/humanBeing";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.less']
})
export class TeamsComponent implements OnInit {

  teams:Team[] = []

  columns = ['position','name', 'buttons'];

  constructor( private api: TeamApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTeams()
  }

  getTeams(){
    this.api.getTeams().subscribe(v => this.teams = v,   e => {this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})})
  }
  createTeam() {

  }

  deleteTeam() {

  }
}
