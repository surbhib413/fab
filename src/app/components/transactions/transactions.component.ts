import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})


export class TransactionsComponent implements OnInit, OnChanges {

  charges = {
    groupName: 'charges',
    dropDownType: 'currency'
  };

  data: [];
  constructor(private transactionService: TransactionService) { }
   ngOnChanges(changes) {
   }

  ngOnInit() {
    this.transactionService.getTransactionsByAccount('1001', resp => {
      this.data = resp;
      console.log('Transaction list', this.data);
    });
  }
}
