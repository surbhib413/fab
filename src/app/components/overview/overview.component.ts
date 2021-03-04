import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { AccountService } from 'src/app/service/account.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  colCount = [];
  accountDetails: any;
  constructor(private sharedService: SharedService, private accountService: AccountService) { }

  ngOnInit() {
    //this.colCount = [0, 1, 2];
    this.accountService.getAccountsCountByClient((response, error) => {
      if (response) {
        this.accountDetails = response;
        for(let i=0; i<this.accountDetails['counts'].length;i++){
          this.colCount.push(i);
        }
      } else {
        console.log('error occured', error);
      }
    }, '');
  }

  goToAccountList(val){
    //console.log(val);
    if(val === 'FAB'){
      this.sharedService.updateAccountTab(1);
      this.sharedService.updateFabAccountsFilter(true);
    }
  }

}
