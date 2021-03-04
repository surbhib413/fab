import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lc-dialog',
  templateUrl: './lc-dialog.component.html',
  styleUrls: ['./lc-dialog.component.scss']
})
export class LCDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private router: Router,  private dialogRef: MatDialogRef<LCDialogComponent>) {
    dialogRef.disableClose = true;
   }
  currDate = Date.now()
  ngOnInit() {

  }

  redirectToLanding(){
    this.router.navigate(['/dashboard']);
  }
}
