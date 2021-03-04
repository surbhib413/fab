import { SharedService } from "./../../service/shared.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../service/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PreferenceDialogComponent } from "../preference-dialog/preference-dialog.component";
import { SessionDialogComponent } from "../session-dialog/session-dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material";
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  lcDashboard: boolean = true;
  createLC: boolean = false;
  breadCrumbLcId: boolean = false;
  accountService: boolean = false;
  profile_url: String;
  role = window.localStorage.getItem("role");
  profile_name: string;
  lcId: string;
  pageHeading: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  setPageHeader() {
    //console.log(this.router.url);
    if (this.router.url == "/accountService") {
      this.pageHeading = "Account Services";
    } else {
      this.pageHeading = "Letter Of Credit";
    }
  }

  ngOnInit() {
    /* setting the page header based on route parameter */
    this.setPageHeader();

    this.profile_url = localStorage.getItem("profile_url");
    this.sharedService.createLcBreadcrumb.subscribe(res => {
      this.createLC = res;
    });

    this.sharedService.updateLcIdForBreadCrumb.subscribe(res => {
      this.breadCrumbLcId = res;
    });

    this.sharedService.getLcId.subscribe(res => {
      this.lcId = res;
    });

    this.sharedService.breadCrumbDetailsservice.subscribe(response => {
      var res = JSON.parse(JSON.stringify(response));
      this.lcDashboard = res.lcDashboard;
      this.accountService = res.accountService;
      this.createLC = res.createLC;
      this.breadCrumbLcId = res.breadCrumbLcId;
    });
  }

  showTickerVar: boolean = false;
  tickerBox() {
    this.showTickerVar = !this.showTickerVar;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PreferenceDialogComponent, {
      panelClass: "prefrence-dialog"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  openNotificationDialog(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      panelClass: "notification-dialog",
      //hasBackdrop: false,
      backdropClass: "no-backdrop",
      position: {
        top: "30px",
        left: "1050px"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  openSessionDialog(): void {
    const dialogRef = this.dialog.open(SessionDialogComponent, {
      panelClass: "session-dialog"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The session dialog was closed");
    });
  }

  logout() {
    if (this.authService.isLoggedin()) {
      console.log("Logout pending");
      localStorage.removeItem("currentUser");
      window.localStorage.clear();
      this.router.navigate(["/user"]);
    }
  }

  goToDashboard() {
    this.createLC = false;
    this.breadCrumbLcId = false;
    this.router.navigate(["/dashboard"]);
  }
  goToAccountService() {
    this.router.navigate(["accountService"]);
  }
}
