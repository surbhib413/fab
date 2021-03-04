import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/report-dialog/report-dialog.component';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  entityList: any;
  bankList: any;
  openDialog() {
    // const dialogRef = this.dialog.open(ReportDialogComponent);
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      panelClass : 'report-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.entityList = ['Beverage', 'Consulting', 'Airlines', 'steel'];
    this.bankList = ['FAB', 'ENDB', 'ADBC', 'SBI'];
  }

}
