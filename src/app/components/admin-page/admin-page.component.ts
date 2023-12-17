import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {MatDialog} from "@angular/material/dialog";
import {AdminFormComponent} from "../admin-form/admin-form.component";
import {PageEvent} from "@angular/material/paginator";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {

  @ViewChild("reportWindow") report: HTMLIFrameElement | undefined
  showReport = false
  tasks: Task[] = [];
  columns = ['position', 'id', 'type', 'variables', 'buttons']
  pageSizeOptions = [5,10,15];
  limit = 10;
  pageIndex = 0;
  length = 0;
  isHost = false
  reportContent = '<div class=\'tableauPlaceholder\' id=\'viz1702764854444\' style=\'position: relative\'><noscript><a href=\'#\'><img alt=\'Dashboard 1 \' src=\'https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;WD&#47;WDWQ44PF4&#47;1_rss.png\' style=\'border: none\' /></a></noscript><object class=\'tableauViz\'  style=\'display:none;\'><param name=\'host_url\' value=\'https%3A%2F%2Fpublic.tableau.com%2F\' /> <param name=\'embed_code_version\' value=\'3\' /> <param name=\'path\' value=\'shared&#47;WDWQ44PF4\' /> <param name=\'toolbar\' value=\'yes\' /><param name=\'static_image\' value=\'https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;WD&#47;WDWQ44PF4&#47;1.png\' /> <param name=\'animate_transition\' value=\'yes\' /><param name=\'display_static_image\' value=\'yes\' /><param name=\'display_spinner\' value=\'yes\' /><param name=\'display_overlay\' value=\'yes\' /><param name=\'display_count\' value=\'yes\' /><param name=\'language\' value=\'en-US\' /></object></div>                <script type=\'text/javascript\'>                    var divElement = document.getElementById(\'viz1702764854444\');                    var vizElement = divElement.getElementsByTagName(\'object\')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width=\'1000px\';vizElement.style.height=\'827px\';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width=\'1000px\';vizElement.style.height=\'827px\';} else { vizElement.style.width=\'100%\';vizElement.style.height=\'1477px\';}                     var scriptElement = document.createElement(\'script\');                    scriptElement.src = \'https://public.tableau.com/javascripts/api/viz_v1.js\';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>';
  constructor(private router: Router, private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks()
  }

  ngAfterViewInit(){

    // @ts-ignore
    let ifrDoc = this.report?.nativeElement.contentWindow?.document
    ifrDoc?.open()
    ifrDoc?.write(this.reportContent)
    ifrDoc?.close()
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

  setPageOptions(e: PageEvent) {
    this.limit = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getTasks()
  }
}
