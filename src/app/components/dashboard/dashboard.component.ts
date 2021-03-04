import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isExpanded: boolean = true;
  lcDashboard:boolean=true;
  createLC:boolean=false;
  breadCrumbLcId: boolean = false;
  lcId: string = "";
  

  constructor(private router: Router ,private sharedService : SharedService) { }

  ngOnInit() {
    this.updateIsExpandedVar();

    
    this.sharedService.createLcBreadcrumb.subscribe(res => {
      this.createLC = res;
    })

    this.sharedService.updateLcIdForBreadCrumb.subscribe(res => {
      this.breadCrumbLcId = res;
    })

    this.sharedService.getLcId.subscribe(res => {
      this.lcId = res;
    })
    

  }

  footerExpand(){
    console.log('Is Expanded:', this.isExpanded);
    this.isExpanded = !this.isExpanded;
    this.updateIsExpandedVar();
  }

  updateIsExpandedVar() {
    this.sharedService.updateIsExpandedVar(this.isExpanded)
  }

  locBreadCrumb(val: boolean) {
    // this.lcDashboard = val;
    // this.createLC = false;
    // this.breadCrumbLcId = false;
  }

  accountServiceBreadCrumb(val: boolean) {
    // this.lcDashboard = val;
    // this.createLC = false;
    // this.breadCrumbLcId = false;
  }

  goToDashboard(){
    this.createLC = false;
    this.breadCrumbLcId = false;
    this.router.navigate(['/dashboard']);
  }
}
