import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-filter-dialog',
  templateUrl: './accounts-filter-dialog.component.html',
  styleUrls: ['./accounts-filter-dialog.component.scss']
})
export class AccountsFilterDialogComponent implements OnInit {
  options: string[] = [
    "Account Type",
    "Account Number",
    "Transaction Type",
    "Transaction Mode",
  ];
  options1: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
