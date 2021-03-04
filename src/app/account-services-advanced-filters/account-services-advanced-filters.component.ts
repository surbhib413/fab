import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../wip/wip.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-account-services-advanced-filters',
  templateUrl: './account-services-advanced-filters.component.html',
  styleUrls: ['./account-services-advanced-filters.component.scss'],
})
export class AccountServicesAdvancedFiltersComponent implements OnInit {

  containers = [];
  currency = [];
  geographies = [];
  banks = [];
  amount = [];


  constructor(public dialogRef: MatDialogRef<AccountServicesAdvancedFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
    this.containers.push(1);
    this.currency.push(1);
    this.geographies.push(1);
    this.banks.push(1);
    this.amount.push(1);
  }



  addEntity() {
    this.containers.push(this.containers.length);
  }
  addCurrency() {
    this.currency.push(this.currency.length);
  }
  addGeographies() {
    this.geographies.push(this.geographies.length);
  }
  addBanks() {
    this.banks.push(this.banks.length);
  }
  addAmount() {
    this.amount.push(this.amount.length);
  }


  
}
