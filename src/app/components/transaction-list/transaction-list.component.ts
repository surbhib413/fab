import { Component, OnInit ,ChangeDetectionStrategy, Input} from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit {
  transactionData: any[];
  @Input() data;
  constructor(private transactionService: TransactionService,private datePipe: DatePipe) { }

  ngOnChanges(changes) {
   if (this.data) {
      const transactions = [];
      this.data.forEach(element => {
        const transaction = {
          'Date': this.datePipe.transform(element.transaction_date,"d MMM y"),
          'Narration': element.narrative,
          'Tag': element.tag,
          'Mode': element.payment_mode,
          'Credit': element.credit_aed +" "+ element.credit_currency,
          'Debit': element.debit_aed +" "+ element.debit_currency,
          'Balance': element.available_balance +" " +"AED"
        };
        transactions.push(transaction);
      });
      this.transactionData = transactions;
      console.log("this.transactionData",this.transactionData);
    }
  }


  ngOnInit() {
    if (this.data) {
      console.log('This is table  Data', this.data);
    }
  }

}
