import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-create-lc-dialog',
  templateUrl: './create-lc-dialog.component.html',
  styleUrls: ['./create-lc-dialog.component.scss']
})
export class CreateLcDialogComponent implements OnInit {

  constructor(private router: Router , private sharedService: SharedService) { }

  ngOnInit() {
  }

  goToNewLcForm(){
    this.sharedService.appendBreadcrumb(true);
    this.sharedService.appendLcIdInBreadcrumb(false);
    this.router.navigate(['/dashboard/lcForm']);
  }
}
