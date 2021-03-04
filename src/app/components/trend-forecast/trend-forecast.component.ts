import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccountDetailsDialogComponent } from '../account-details-dialog/account-details-dialog.component';
import { TrendCurrencyDialogComponent } from '../trend-currency-dialog/trend-currency-dialog.component';

@Component({
  selector: 'app-trend-forecast',
  templateUrl: './trend-forecast.component.html',
  styleUrls: ['./trend-forecast.component.scss']
})
export class TrendForecastComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AccountDetailsDialogComponent, {
      panelClass : 'save-template-dailog',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  trendCurrency() {
    const trendCurr = this.dialog.open(TrendCurrencyDialogComponent, {
      panelClass : 'trend-currency-dialog',
    });

    trendCurr.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
