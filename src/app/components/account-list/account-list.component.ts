import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { AccountsFilterDialogComponent } from "../accounts-filter-dialog/accounts-filter-dialog.component";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SharedService } from 'src/app/service/shared.service';
import { SortLcData } from '../../service/sort-lc-data.pipe';
import { SortAccountData } from '../../service/sort-account-data.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  providers: [TitleCasePipe]
})
export class AccountListComponent implements OnInit {

  @Output() displayAccountDetails: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data;
  @ViewChild(MatSort) sort: MatSort;

  color = "red";

  displayedColumns: string[] = ['entity_name', 'bank_name', 'branch_name', 'account_name',
    'account_number', 'account_type', 'account_base_currency', 'available_balance', 'balance_in_aed'];
  dataSource: MatTableDataSource<any>;
  pageSize: number = 5;
  accountListLength: number = 0;
  selectedFilter = '';
  showAccountFilter: string;

  filterCategory: string;
  filterType: string[] = [];
  filterName: string;
  filterList: [{}];
  resultArray: [];
  showEntityView: boolean = false;
  entityTypes: string[];
  groupedData: [];
  orderByStr: string = '';

  groupBy = {
    type: "groupBy",
    list: [
      { label: "Bank", value: "bank_name", checked: false },
      { label: "Entity", value: "entity_name", checked: true },
      { label: "Account Type", value: "account_type", checked: false },
      { label: "Currency", value: "account_base_currency", checked: false },
      { label: "Branch", value: "branch_name", checked: false }
    ]
  };

  constructor(private router: Router, private accountService: AccountService, private sortLcData: SortLcData,
    private sortAccountData: SortAccountData, private titlecasePipe: TitleCasePipe, public dialog: MatDialog, private sharedService: SharedService) { }

  accountDetails: any;
  colCount = [];
  depositsGraph = [100, 110, 105, 110, 100, 105, 106];


  selectedFilter1 = "entity1";
  showFilter: string;
  entityDisplayVal = "All Entities";
  bankDisplayVal = "All Banks";
  regionDisplayVal = "All Regions";
  legendRange: any;

  entity1 = {
    type: "entity",
    list: [
      { label: "All Entities", value: "all", checked: true },
      { label: "Top 5 Entities", value: "", checked: false },
      { label: "Bottom 5 Entities", value: "", checked: false },
      { label: "Consulting", value: "consulting", checked: false },
      { label: "Tax", value: "tax", checked: false },
      { label: "Audit & Assurance", value: "audit & assurance", checked: false },
      { label: "Deloitte Shared Service", value: "deloitte shared service", checked: false }
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

  heatMapData = {};
  entityList1: Array<string> = [];
  bankList1: Array<string> = [];
  regionList1: Array<string> = [];

  mirrorChartData = {
    beneficiaryData: [30, 40, 50, 20, 30],
    payerData: [-20, -30, -50, -20, -10],
    maxRecords: 5,
    currencyType: "K"
  }

  // mirrorChartData = {};
  ngOnInit() {
    this.sharedService.showAccountListFilterService.subscribe(res => {
      this.filterCategory = res;
      console.log('show entity filter', this.showEntityView);

    });


    this.sharedService.showFilterService.subscribe(res => {
      this.showFilter = res;
    });

    this.accountService.getAccount((response, error) => {
      if (response) {
        // console.log('Accounts Service Data', response);
        this.dataSource = response;
        this.filterList = response;
        this.accountListLength = response.length;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log('dataSource', this.dataSource);
        // console.log('Filter List', this.filterList);
      } else {
        console.log('error occured', error);
      }
    });

    this.accountService.getAccountsCountByClient((response, error) => {
      if (response) {
        this.accountDetails = response;
        for (let i = 0; i < this.accountDetails['counts'].length; i++) {
          this.colCount.push(i);
        }
      } else {
        console.log('error occured', error);
      }
    }, '');

    this.setAllEntities();
    this.setAllBanks();
    this.setAllRegions();
    this.getHeatMapData();

    this.getMirrorChartData();

  }


  getMirrorChartData() {

    let data = {
      payer: {},
      beneficiatary: {}
    }
    this.accountService.getTransactionsDataByClient((response, err) => {
      if (response && response != []) {
        console.log("payer response  ", response);
        data.payer = response;
      } else {
        console.log("no data..........");
      }
      if (err) {
        console.log("error", err);
      }
    }, "credit", "payer_name");

    this.accountService.getTransactionsDataByClient((response, err) => {
      if (response && response != []) {
        console.log("beneficiatary response  ", response);
        data.beneficiatary = response;
        this.formMirrorChartData(data);
      } else {
        console.log("no data..........");
      }
      if (err) {
        console.log("error", err);
      }
    }, "debit", "beneficiary_name");

    // console.log("dataaaaaaaa", data);
    // this.formMirrorChartData(data);

  }

  formMirrorChartData(res) {
    let data = {
      beneficiaryData: [],
      payerData: [],
      maxRecords: 0,
      currencyType: "K"
    }
    let beneficiataryCount = 0;
    res.beneficiatary.sum_values.forEach(val => {
      data.beneficiaryData.push(Math.round(val / 1000));
      beneficiataryCount++;
    });
    let payerCount = 0;
    res.payer.sum_values.forEach(val => {
      data.payerData.push((Math.round(val / 1000)) * -1);
      payerCount++;
    });

    data.maxRecords = beneficiataryCount > payerCount ? beneficiataryCount : payerCount;
    console.log("formed mirror data", data);
    //this.mirrorChartData = data;
  }
  filterAccountList(filterCategory: string) {
    console.log('filter category', filterCategory);
    this.sharedService.updateAccountList(filterCategory);
  }

  updateAccountList(response) {

    console.log('This is the response from the child', response);
    const accountList = response.list;
    console.log('filter type', this.filterType);
    accountList.forEach(ele => {
      if (ele.checked) {
        this.filterType.push(ele.value);
      }
    });

    console.log('Filters to be applied', this.filterType);
    if (this.filterType.includes('entity_name')) {
      this.showEntityView = true;
      this.displayedColumns = ['bank_name', 'branch_name', 'account_name',
        'account_number', 'account_type', 'account_base_currency', 'available_balance', 'balance_in_aed'];

      const groupBy = key => filtered =>
        filtered.reduce((objectsByKeyValue, obj) => {
          const value = obj[key];
          objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
          return objectsByKeyValue;
        }, {});
      const groupByEntity = groupBy('entity_name');
      this.groupedData = groupByEntity(this.filterList);
      console.log('check the sub filters', this.groupedData);

      this.entityTypes = Object.getOwnPropertyNames(this.groupedData);
      console.log('these are the property names', this.entityTypes);
      console.log('Entity filter selected');
      this.dataSource.sort = this.sort;
    }
    if (this.filterType.includes('bank_name')) {
      this.orderByStr = 'bank_name';
      this.dataSource.sort = this.sort;
    }
    if (this.filterType.includes('branch_name')) {
      this.orderByStr = 'branch_name';
      this.dataSource.sort = this.sort;
    }
    if (this.filterType.includes('account_type')) {
      this.orderByStr = 'account_type';
      this.dataSource.sort = this.sort;
    }
    if (this.filterType.includes('account_base_currency')) {
      this.orderByStr = 'account_base_currency';
      this.dataSource.sort = this.sort;
    }
  }

  clearAllFilters() {
    console.log("working");
    this.showEntityView = false;
    this.dataSource = new MatTableDataSource(this.filterList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  orderByBeneficiaryName(selected: string) {
    this.orderByStr = selected;
    console.log('order by', this.orderByStr);
    //  alert("selected"+this.orderByStr);

  }


  openAccountFilterDialog(): void {
    const dialogRef = this.dialog.open(AccountsFilterDialogComponent, {
      panelClass: 'accountsFilter-dialog',
    });

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

  getHeatMapData() {
    this.accountService.getBalanceForHeatMap((response, err) => {
      if (response && response != []) {
        // console.log("getBalanceForHeatMap response  ", response);
        this.formHeatMapData(response);
      } else {
        this.heatMapData = {};
        console.log("no data..........");
      }
      if (err) {
        console.log("error", err);
      }
    }, this.entityList1, this.bankList1, this.regionList1);
  }

  formHeatMapData(res) {
    let mapData = {
      labels: ['Regions'],
      max: 0,
      data: [],
      regionNames: [],
    };
    let graphData = [];
    let maxVal = 0
    res.forEach(ele => {
      mapData.labels.push(ele.entity_name);
      ele.region_wise_balance.forEach(region => {
        graphData[region.region] = [];
        mapData.regionNames.push(this.titlecasePipe.transform(region.region));
        if (maxVal < region.balance)
          maxVal = region.balance;
      });
      mapData.regionNames = mapData.regionNames.filter((el, i, a) => i === a.indexOf(el));
    });
    mapData.max = maxVal;

    res.forEach(ele => {
      for (var k in graphData) {
        let found = false;
        ele.region_wise_balance.forEach(region => {
          if (region.region === k) {
            graphData[k].push(
              region.balance
            );
            found = true;
          }
        });
        if (!found) {
          graphData[k].push(0);
        }
      }
    });

    for (var k in graphData) {
      mapData.data.push(graphData[k]);
    }
    // console.log("dataaaa", mapData);
    this.heatMapData = mapData;
  }


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
    this.getHeatMapData();
    this.sharedService.updateHeatMap(true);
  }

  updatelegend(values) {
    this.legendRange = values;
  }
  goToAccountDetails(accountNum) {
    this.displayAccountDetails.emit(accountNum);
  }

}

