import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() locBreadCrumb: EventEmitter<any> = new EventEmitter();
  @Output() asBreadCrumb: EventEmitter<any> = new EventEmitter();
  showFiller = false;
  resizeFooterVar: boolean = true;
  isExpandedVar: boolean = true;

  constructor(private sharedService: SharedService , private router: Router) { }

  ngOnInit() {
    this.sharedService.isExpandedVarservice.subscribe(res => {
      this.isExpandedVar = res;
    });
  }
  isShown: boolean = false;
  toggleMenu() {
    this.isShown = !this.isShown;
  }

  accountSubMenu: boolean = false;
  accountToggleMenu() {
    this.accountSubMenu = !this.accountSubMenu;
  }

  resizeFooter() {
    console.log('Is Expanded:', this.resizeFooterVar);
    this.resizeFooterVar = !this.resizeFooterVar;
    this.updateIsExpandedVar();
  }

  updateIsExpandedVar() {
    this.sharedService.updateIsExpandedVar(this.resizeFooterVar);
  }

  locBreadcrumb(val: boolean) {
    this.locBreadCrumb.emit(val);
    var obj ={
    accountService: false,
    lcDashboard : val,
    createLC : false,
    breadCrumbLcId : false
    }
    this.sharedService.updateBreadCrumbDetails(obj);
    this.router.navigate(['/dashboard']);
  }

  accountServiceBreadCrumb(val: boolean){
    this.locBreadCrumb.emit(val);
    var obj = {
      accountService: val,
      lcDashboard: false,
      createLC: false,
      breadCrumbLcId: false
    }
    this.sharedService.updateBreadCrumbDetails(obj);
    this.router.navigate(['/accountService']);
  }
}

