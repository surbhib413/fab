import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-return-dialog',
  templateUrl: './return-dialog.component.html',
  styleUrls: ['./return-dialog.component.scss']
})
export class ReturnDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private router: Router, private dialogRef: MatDialogRef<ReturnDialogComponent>) {
    dialogRef.disableClose = true;
   }
   currDate = Date.now()

  ngOnInit() {
  }
  redirectToLanding(){
    this.router.navigate(['/dashboard']);
  }

}
