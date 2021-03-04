import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { SharedService } from 'src/app/service/shared.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  @Output() displayAccountList: EventEmitter<any> = new EventEmitter();
  @Input() accountNum: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  accountDetails: any;

  constructor(private accountService: AccountService, private sharedService: SharedService,
    private transactionService: TransactionService) { }
  displayedColumns: string[] = ['transaction_date', 'narrative', 'payment_mode', 'tag', 'type', 'amount', 'available_balance'];
  dataSource: MatTableDataSource<any>;
  selectedFilter1 = "filter1";
  showFilter: string;
  filter1 = {
    type: "type1",
    list: [
      { label: "Transactions", value: "all", checked: true },
      { label: "Credit", value: "credit", checked: false },
      { label: "Debit", value: "debit", checked: false },
      { label: "Charges", value: "", checked: false },
    ]
  }
  doughnutData = {};
  // filterType1 = ['"debit"', '"credit"'];
  filterType1: Array<string> = [];
  group1 = "transaction_category";
  sum1 = "amount";
  borderColorArray = [
    "#8ad75e",
    "#fb9365",
    "#2979ff",
    "#b182f2",
    "#4dd3e3"
  ];
  filterType1Value = "Transactions";
  transactionListLength: string;
  pageSize: number = 5;

  ngOnInit() {

    this.sharedService.showFilterService.subscribe(res => {
      this.showFilter = res;
    });

    this.accountService.getAccountDetails((response, err) => {
      if (response) {
        this.accountDetails = response;
      }
      if (err) {
        console.log('error', err);
      }
    }, this.accountNum);

    this.setTransaction();
    this.getDoughnutChartData();
    console.log('Account Number', this.accountNum);
    this.getTransactionDetails();
  }

  getTransactionDetails() {
    this.transactionService.getTransactionsByAccount(this.accountNum, res => {
      this.dataSource = new MatTableDataSource(res);
      this.transactionListLength = res.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('dataSource', this.dataSource);
      console.log('Transaction Details', res);
    });
  }

  filterGraphData(filter: string) {
    this.sharedService.updateShowFilter(filter);
  }
  setSelectedFilter(filter: string) {
    this.selectedFilter1 = filter;
  }

  goToAccountList() {
    this.displayAccountList.emit();
  }

  getDoughnutChartData() {
    this.accountService.getDoughnutData((response, err) => {
      if (response) {
        this.formDoughnutData(response);
      }
      if (err) {
        console.log('error', err);
      }
    }, this.filterType1, this.accountNum, this.group1, this.sum1);
  }

  formDoughnutData(res) {
    let donutData = {
      data: [],
      dataCurrency: "K",
      centerText: "",
      labels: []
    };
    donutData.labels = res.keys;
    let sum = 0;
    res.sum_values.forEach(val => {
      sum += val;
      donutData.data.push(Math.round(val / 1000));
    });

    donutData.centerText = "AED " + (sum / 1000) + " K";
    this.doughnutData = donutData;
  }


  setTransaction() {
    this.filterType1.push('"debit"');
    this.filterType1.push('"credit"');
  }
  updateGraph(val) {

    if (val.type === "type1") {
      this.filterType1 = [];
      this.filterType1Value = "";
      if (this.filter1.list[0].checked) {
        this.setTransaction();
        this.filterType1Value = "Transactions";
      } else {
        this.filter1.list.forEach(ele => {
          if (ele.checked && ele.value != "") {
            this.filterType1.push('"' + ele.value + '"');
          }
        });
        let value = this.filterType1[0].slice(1, this.filterType1[0].length - 1);
        value = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 10) {
          value = value.slice(0, 8) + "...";
        }
        if (this.filterType1.length > 1) {
          this.filterType1Value = value + " + " + (this.filterType1.length - 1);
        }
        else {
          this.filterType1Value = value.split(",")[0];
        }
      }
    }

    this.getDoughnutChartData();
    this.sharedService.updatedoughnutChart(true);
  }

  // public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  //   this.sharedService.updateAccountTab(tabChangeEvent.index);
  //   if (tabChangeEvent.index != 1) {
  //     this.sharedService.updateFabAccountsFilter(false);
  //   }
  // }

}
