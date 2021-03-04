import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/service/account.service";
import { SharedService } from "src/app/service/shared.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountServicesAdvancedFiltersComponent } from 'src/app/account-services-advanced-filters/account-services-advanced-filters.component';


export interface Report {
  name: string;
  date: string;
  generatedOn: string;
  category: string;
  imageUrl: string;
}

export interface Actions {
  bank: string;
  branch: string;
  acName: string;
  acNumber: string;
  acType: string;
  curr: string;
  overdraft: string;
  recommendedAction: string;
}

const REPORT_DATA: Report[] = [
  {
    name: "MT940",
    date: "30-03-19",
    generatedOn: "30-03-19",
    category: "Accounts",
    imageUrl: "assets/icons/download.png"
  },
  {
    name: "MT939",
    date: "25-03-19",
    generatedOn: "23-03-19",
    category: "Accounts",
    imageUrl: "assets/icons/download.png"
  },
  {
    name: "MT938",
    date: "15-03-19",
    generatedOn: "12-03-19",
    category: "Accounts",
    imageUrl: "assets/icons/download.png"
  },
  {
    name: "MT937",
    date: "29-02-19",
    generatedOn: "25-02-19",
    category: "Accounts",
    imageUrl: "assets/icons/download.png"
  }
];
const ACTIONS_DATA: Actions[] = [
  {
    bank: "Bank 1",
    branch: "Branch Name",
    acName: "Name",
    acNumber: "12343256783",
    acType: "Current",
    curr: "AED",
    overdraft: "321,321.03",
    recommendedAction: "Move AED 321,321.03 to A/C to save charges of AED 2.031"
  },
  {
    bank: "Bank 2",
    branch: "Branch Name",
    acName: "Name",
    acNumber: "12343256783",
    acType: "Current",
    curr: "AED",
    overdraft: "321,321.03",
    recommendedAction: "Move AED 321,321.03 to A/C to save charges of AED 2.031"
  },
  {
    bank: "Bank 3",
    branch: "Branch Name",
    acName: "Name",
    acNumber: "12343256783",
    acType: "Current",
    curr: "AED",
    overdraft: "321,321.03",
    recommendedAction: "Move AED 321,321.03 to A/C to save charges of AED 2.031"
  }
];

@Component({
  selector: "app-account-service-overview",
  templateUrl: "./account-service-overview.component.html",
  styleUrls: ["./account-service-overview.component.scss"]
})
export class AccountServiceOverviewComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }
  displayedColumns: string[] = [
    "name",
    "date",
    "generatedOn",
    "category",
    "imageUrl"
  ];
  dataSource = REPORT_DATA;
  displayedColumns1: string[] = [
    "bank",
    "branch",
    "acName",
    "acNumber",
    "acType",
    "curr",
    "overdraft",
    "recommendedAction"
  ];
  dataSource1 = ACTIONS_DATA;

  accountDetails: any;
  numOfAccounts: number;
  numOfBanks: number;
  totalBalance: number;

  accountsGraph = [];
  accountsGraphPer: any;

  depositsGraph = [100, 110, 105, 110, 100, 105, 108];
  cardsGraph = [15, 30, 15, 35, 15, 20, 20];
  loansGraph = [20, 25, 20, 30, 20, 15, 25];

  stackedData: any;
  entityList1: Array<string> = [];
  bankList1: Array<string> = [];
  regionList1: Array<string> = [];

  //selectedFilter1 = "entity1";
  selectedFilter1 = "balance1";
  showFilter: string;
  entityDisplayVal = "All Entities";
  bankDisplayVal = "All Banks";
  regionDisplayVal = "All Regions";

  entity1 = {
    type: "entity",
    list: [
      { label: "All Entities", value: "all", checked: true },
      { label: "Top 5 Entities", value: "", checked: false },
      { label: "Bottom 5 Entities", value: "", checked: false },
      { label: "Consulting", value: "consulting", checked: false },
      { label: "Tax", value: "tax", checked: false },
      {
        label: "Audit & Assurance",
        value: "audit & assurance",
        checked: false
      },
      {
        label: "Deloitte Shared Service",
        value: "deloitte shared service",
        checked: false
      }
    ]
  };

  bank1 = {
    type: "bank",
    list: [
      { label: "All Banks", value: "", checked: true },
      { label: "Top 5 Banks", value: "", checked: false },
      { label: "Bottom 5 Banks", value: "", checked: false },
      { label: "FAB", value: "FAB", checked: false },
      { label: "ENBD", value: "ENBD", checked: false },
      { label: "ADCB", value: "ADCB", checked: false }
    ]
  };

  region1 = {
    type: "region",
    list: [
      { label: "All Regions", value: "", checked: true },
      { label: "Middle East", value: "middle east", checked: false },
      { label: "Africa", value: "africa", checked: false },
      { label: "Asia Pacific", value: "asia pacific", checked: false },
      { label: "North America", value: "north america", checked: false },
      { label: "South America", value: "south america", checked: false },
      { label: "Europe", value: "europe", checked: false }
    ]
  };

  ngOnInit() {
    this.sharedService.showFilterService.subscribe(res => {
      this.showFilter = res;
    });

    //To get card value
    this.accountService.getAccountsCountByClient((response, error) => {
      if (response) {
        this.accountDetails = response;
        this.numOfBanks = response.bank_names.length;
        this.numOfAccounts = response.counts.reduce((a, b) => a + b, 0);
        this.totalBalance =
          response.total_balances.reduce((a, b) => a + b, 0) / 1000000;
      } else {
        console.log("error occured", error);
      }
    }, "");

    //To get data for line graph inside card
    this.accountService.getAccountBalanceData(
      (response, error) => {
        if (response) {
          this.accountsGraph = response.total_balances;
        } else {
          console.log("error occured", error);
        }
      },
      "2019-10-09",
      "2019-10-16"
    );

    //To get positive or negative value of the graph (This week)
    this.accountService.getPercentageChange(
      (response, error) => {
        if (response) {
          this.accountsGraphPer = response.percentage_change;
        } else {
          console.log("error occured", error);
        }
      },
      "2019-10-09",
      "2019-10-15"
    );

    //Initially set all entity and bank as filter 
    this.setAllEntities();
    this.setAllBanks();
    this.setAllRegions();

    this.getStackedData();
  }

  setAllEntities() {
    this.entityList1.push('"tax"');
    this.entityList1.push('"consulting"');
    this.entityList1.push('"deloitte shared service"');
    this.entityList1.push('"audit & assurance"');
  }

  setAllBanks() {
    this.bankList1.push('"FAB"');
    this.bankList1.push('"ADCB"');
    this.bankList1.push('"ENBD"');
  }

  setAllRegions() {
    this.regionList1.push('"north america"');
    this.regionList1.push('"south america"');
    this.regionList1.push('"asia pacific"');
    this.regionList1.push('"middle east"');
    this.regionList1.push('"africa"');
    this.regionList1.push('"europe"');
  }

  //Method to get the data for stacked bar chart
  getStackedData() {
    this.accountService.getBalanceForStackedBar((response, err) => {
      if (response && response != []) {
        // console.log("getBalanceForStackedBar response  ", response);
        this.formStackedData(response);
      } else {
        this.stackedData = [];
        console.log("no data");
      }
      if (err) {
        console.log("error", err);
      }
    }, this.entityList1, this.bankList1, this.regionList1);
  }

  //Method to format the data suitable to display graph 
  formStackedData(res) {
    let data = {
      entityNames: [],
      graphData: {},
      max: 0,
      barValues: []
    };

    //Populates EntityNames and will calculate max value and barValues
    let max = 0;
    res.forEach(ele => {
      data.entityNames.push(ele.entity_name);
      let sum = 0;
      ele.bank_wise_balance.forEach(bank => {
        data.graphData[bank.bank_name] = [];
        sum += bank.balance;
      });
      data.barValues.push((sum / 1000000).toFixed(3) + "M AED 0%");
      if (sum > max) {
        max = sum;
      }
    });
    max = (Math.ceil(max / 20000) * 20000) + 20000;
    data.max = max;


    //will format the "Bank wise" suitable to display in graph
    res.forEach(ele => {
      for (var k in data.graphData) {
        let found = false;
        ele.bank_wise_balance.forEach(bank => {
          if (bank.bank_name === k) {
            data.graphData[k].push(
              bank.balance
            );
            found = true;
          }
        });
        if (!found) {
          data.graphData[k].push(null);
        }
      }
    });

    this.stackedData = data;
    // console.log("formed stacked data", data);
  }

  // gotoAccountDetails() {
  //   this.router.navigate(["/accountService/accountDetails"]);
  // }

  filterGraphData(filter: string) {
    this.sharedService.updateShowFilter(filter);
  }
  
  setSelectedFilter(filter: string) {
    this.selectedFilter1 = filter;
  }

  updateGraph(val) {

    if (val.type === "entity") {
      this.entityList1 = [];
      this.entityDisplayVal = "";
      if (this.entity1.list[0].checked) {
        this.setAllEntities();
        this.entityDisplayVal = "All Entities";
      } else {
        this.entity1.list.forEach(ele => {
          if (ele.checked && ele.value != "") {
            this.entityList1.push('"' + ele.value + '"');
            // val += ele.value.charAt(0).toUpperCase() + ele.value.slice(1) + " , ";
          }
        });
        let value = this.entityList1[0].slice(1, this.entityList1[0].length - 1);
        value = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 10) {
          value = value.slice(0, 8) + "...";
        }
        if (this.entityList1.length > 1) {
          this.entityDisplayVal = value + " + " + (this.entityList1.length - 1);
        }
        else {
          this.entityDisplayVal = value.split(",")[0];
        }
      }
    }
    else if (val.type === "bank") {
      this.bankDisplayVal = "";
      this.bankList1 = [];
      if (this.bank1.list[0].checked) {
        this.setAllBanks();
        this.bankDisplayVal = "All Banks";
      } else {
        this.bank1.list.forEach(ele => {
          if (ele.checked && ele.value != "") {
            this.bankList1.push('"' + ele.value + '"');
          }
        });
        let value = this.bankList1[0].slice(1, this.bankList1[0].length - 1);
        value = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 10) {
          value = value.slice(0, 8) + "...";
        }
        if (this.bankList1.length > 1) {
          this.bankDisplayVal = value + " + " + (this.bankList1.length - 1);
        }
        else {
          this.bankDisplayVal = value.split(",")[0];
        }
      }
    }
    else if (val.type === "region") {
      this.regionDisplayVal = "";
      this.regionList1 = [];
      if (this.region1.list[0].checked) {
        this.setAllRegions();
        this.regionDisplayVal = "All Regions";
      } else {
        this.region1.list.forEach(ele => {
          if (ele.checked && ele.value != "") {
            this.regionList1.push('"' + ele.value + '"');
          }
        });
        let value = this.regionList1[0].slice(1, this.regionList1[0].length - 1);
        value = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 10) {
          value = value.slice(0, 8) + "...";
        }
        if (this.regionList1.length > 1) {
          this.regionDisplayVal = value + " + " + (this.regionList1.length - 1);
        }
        else {
          this.regionDisplayVal = value.split(",")[0];
        }
      }
    }
    this.getStackedData();
    this.sharedService.updateStackedGraph(true);
  }






  openDialog(): void {
    const dialogRef = this.dialog.open(AccountServicesAdvancedFiltersComponent, {
      width: '643px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
