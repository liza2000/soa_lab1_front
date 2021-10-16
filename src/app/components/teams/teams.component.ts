import {Component, Inject, OnInit} from '@angular/core';
import {TeamApiService} from "../../services/team-api.service";
import {RequestType, Team} from "../../model/humanBeing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.less']
})
export class TeamsComponent implements OnInit {

  allTeams: Team[] = [];
  teams: Team[] =[];

  add = false;
  columns = ['position', 'name', 'buttons'];
  name = new FormControl('', [Validators.required, v => v.value.trim().length == 0 ? {blank: true} : null]);
  teamsControl = new FormControl('', Validators.required);

  constructor(private api: TeamApiService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    if (this.data)
      this.getTeamsByHumanId(this.data);

      this.getTeams()
  }

  getTeamsByHumanId(id: number) {
    this.api.getTeamsBuHumanId(id).subscribe(v => this.teams = v, e => {
      this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})
    })
  }

  getTeams() {
    this.api.getTeams().subscribe(v => this.allTeams = v, e => this.showError(e))
  }

  createTeam() {
    if (!this.add) {
      this.add = true;
      return;
    }
    this.add = false;
    if (!this.data && this.name.valid)
      this.api.saveTeam({name: this.name.value}).subscribe(v => {
        this.getTeams();
        this.name.setValue('')
      }, e => this.showError(e));

    if (this.data && this.teamsControl.valid)
      this.teamsControl.value.forEach(t =>
        this.api.addHumanToTeam(this.data, t).subscribe(v => {
          this.getTeamsByHumanId(this.data);
          this.teamsControl.setValue('')
        }, e => this.showError(e))
      )
  }

  deleteTeam(team: Team) {
    if (this.data)
      this.api.removeHumanFromTeam(this.data, team.id).subscribe(v => this.getTeamsByHumanId(this.data), error => this.showError(error));
    else
      this.api.deleteTeam(team.id).subscribe(v => {
        this.showSuccess(v);
        this.getTeams()
      }, error => this.showError(error));
  }

  showError(error) {
    this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})
  }

  showSuccess(v){
    this.snackBar.open(v, 'Success', {duration: 5000, direction: "ltr", panelClass: 'success-snackbar'});
  }
}
