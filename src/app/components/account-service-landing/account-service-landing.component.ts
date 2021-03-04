import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/service/account.service";
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: "app-account-service-landing",
  templateUrl: "./account-service-landing.component.html",
  styleUrls: ["./account-service-landing.component.scss"]
})
export class AccountServiceLandingComponent implements OnInit {
  // landingAccount = {
  //   groupName: "account",
  //   dropDownType: "none"
  // };
  // landingDeposit = {
  //   groupName: "deposit",
  //   dropDownType: "none"
  // };
  // landingCards = {
  //   groupName: "cards",
  //   dropDownType: "none"
  // };
  // landingLoan = {
  //   groupName: "loan",
  //   dropDownType: "none"
  // };

  isAccountList = true;
  accountNum = "";

  constructor() { }

  ngOnInit() { }

  displayAccountDetails(accountNum) {
    this.isAccountList = false;
    this.accountNum = accountNum;
  }
  displayAccountList() {
    this.isAccountList = true;
  }
}
