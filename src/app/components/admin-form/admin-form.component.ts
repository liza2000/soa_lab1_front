import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.less']
})
export class AdminFormComponent implements OnInit {

  showReport = false
  tasks: Task[] = [];
  columns = ['position', 'id', 'type', 'variables', 'buttons']
  pageSizeOptions = [5,10,15];
  limit = 10;
  pageIndex = 0;
  length = 0;
  isHost = false
  constructor(private router: Router, private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(){
    this.adminService.getTasks().subscribe(data=> this.tasks = data)
  }

  logOut() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isHost")
    this.router.navigate(['/login'])
  }


  toggleMode() {
    this.showReport = !this.showReport
  }

  openTaskForm(task: Task) {
    this.dialog.open(AdminFormComponent, {data: task})
  }
}
