import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorize-dialog',
  templateUrl: './authorize-dialog.component.html',
  styleUrls: ['./authorize-dialog.component.scss']
})
export class AuthorizeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef: MatDialogRef<AuthorizeDialogComponent>,private router: Router) {
    dialogRef.disableClose = true;
   }
  currDate = Date.now()

  ngOnInit() {
  }
  redirectToLanding(){
    this.router.navigate(['/dashboard']);
  }
}
