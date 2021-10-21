import {Component, Inject, OnInit} from '@angular/core';
import {TeamApiService} from "../../services/team-api.service";
import {HumanBeing, RequestType, Team} from "../../model/humanBeing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.less']
})
export class TeamsComponent implements OnInit {

  allTeams: Team[] = [];
  teams: Team[] = [];
  humans: HumanBeing[];

  add = false;
  realHeroOnly = false;
  needUpdate = false;
  columns = ['position', 'name', 'buttons'];
  name = new FormControl('', [Validators.required, v => v.value.trim().length == 0 ? {blank: true} : null]);
  teamsControl = new FormControl('', Validators.required);
  selectedHumans = new FormControl();

  constructor(private api: TeamApiService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: number, private dialogRef: MatDialogRef<TeamsComponent>) {
  }

  ngOnInit(): void {
    if (this.data)
      this.getTeamsByHumanId(this.data);
    else {
      this.getTeams();
    this.getHumans();
    }
  }

  getHumans(){
    this.api.search(this.realHeroOnly).subscribe(v => this.humans = v.list, e => this.showError(e))
  }

  getTeamsByHumanId(id: number) {
    this.api.getTeamsBuHumanId(id).subscribe(v => {
      this.teams = v;
      this.getTeams()
    }, e => {
      this.snackBar.open(e.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})
    })
  }

  getTeams() {
    this.api.getTeams().subscribe(v => {
      if (this.data)
        this.allTeams = v.filter(t => !this.teams.includes(t));
      else
        this.allTeams = v
    }, e => this.showError(e))
  }

  handleAdd(){
    this.add = !this.add;
  }

  createTeam() {
    if (!this.add) {
      this.add = true;
      return;
    }
    this.add = false;
    if (!this.data && this.name.valid)
      this.api.saveTeam({name: this.name.value}).subscribe(v => {
        this.selectedHumans.value.forEach(h =>
          this.api.addHumanToTeam(h, v.id).subscribe(v => {
          }, e => this.showError(e)));
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
        this.showSuccess('Team '+team.name+' successfully deleted');
        this.getTeams()
      }, error => this.showError(error));
  }

  showError(error) {
    this.snackBar.open(error.error, 'Error', {duration: 5000, panelClass: 'error-snackbar'})
  }

  showSuccess(v) {
    this.snackBar.open(v, 'Success', {duration: 5000, direction: "ltr", panelClass: 'success-snackbar'});
  }

  makeDepressive(team: Team) {
    this.api.makeDepressive(team.id).subscribe(v => {
      this.needUpdate = true;
      this.showSuccess('humans in team ' + team.name + ' was updated')
    }, e => this.showError(e))
  }

  close() {
    this.dialogRef.close(this.needUpdate)
  }
}
