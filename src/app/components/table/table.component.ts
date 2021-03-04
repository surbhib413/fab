import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SharedService } from 'src/app/service/shared.service';
import { json } from 'd3';
import { type } from 'os';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data;
  @Input() filterValue;
  @Input() type;
  @Output() selectedFilterList: EventEmitter<any> = new EventEmitter();
  filterData = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  filtersSelected = {
    entity: [],
    bank: [],
    base_currency: []
  };
  transaction: boolean = false;
  accounts: boolean = false;

  isGroupBy: boolean = false;
  dateGroup0 = [];
  dateGroup1 = [];
  dateGroup2 = [];

  viewType: string = "Date View";
  isTransctionGroup: boolean;
  tableView: boolean = true;
  dateGroupBy: boolean;

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnChanges(changes) {
    if (this.data) {
      this.displayedColumns = Object.keys(this.data[0]);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.data.forEach(obj => {
        (obj).hasOwnProperty("Tag") ? this.accounts = false : this.accounts = true;
      });
      if (this.filterValue != "clear") {
        this.updateFilterSelected(this.type, this.filterValue);
        this.updateData(this.data);
      } else {
        this.filtersSelected = {
          entity: [],
          bank: [],
          base_currency: []
        };
      }
    }
  }

  updateFilterSelected(type, filterValue) {
    for (const key in this.filtersSelected) {
      if (key === type.toLowerCase()) {
        this.filtersSelected[key].push(filterValue);
      }
    }
  }

  ngOnInit() {
    if (this.data) {
      console.log('This is table  Data', this.data);
    }
  }

  getAllFilters(data) {
    const filter = {
      entity: {},
      bank: {},
      base_currency: {},
    };
    data.forEach(obj => {
      // entity here
      !filter.entity.hasOwnProperty(obj.Entity) ? filter.entity[obj.Entity] = 1 : filter.entity[obj.Entity]++;
      // amount here
      !filter.bank.hasOwnProperty(obj.Bank) ? filter.bank[obj.Bank] = 1 : filter.bank[obj.Bank]++;
      // base currency here
      !filter.base_currency.hasOwnProperty(obj['Base Currency']) ?
        filter.bank[obj['Base Currency']] = 1 : filter.bank[obj['Base Currency']]++;
    });
    console.log(filter);
    return filter;
  }

  updateData(data): void {
    var newArr = [];
    const updatedDataArr = data.forEach(item => {
      for (const key in this.filtersSelected) {
        if (key.toLowerCase() === 'entity') {
          if (this.filtersSelected[key].indexOf(item.Entity) > -1) {
            newArr.push(item);
            return newArr;
          }
        }
      }
    });
    var UpdatedArr2 = [];
    if (this.filtersSelected['bank'].length > 0) {
      if (newArr.length === 0) {
        newArr = [...data];
      }
      newArr.forEach(item => {
        for (const key in this.filtersSelected) {
          if (key.toLowerCase() === 'bank') {
            if (this.filtersSelected[key].indexOf(item.Bank) > -1) {
              UpdatedArr2.push(item);
              newArr = [...UpdatedArr2];
              this.dataSource = new MatTableDataSource(UpdatedArr2);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }
        }
      });
      newArr = [...UpdatedArr2];
    }
    else {
      UpdatedArr2 = [...newArr];
      this.dataSource = new MatTableDataSource(UpdatedArr2);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    var UpdatedArr3 = [];
    if (this.filtersSelected['base_currency'].length > 0) {
      if (newArr.length === 0) {
        newArr = [...data];
      }
      newArr.forEach(item => {
        for (const key in this.filtersSelected) {
          if (key === 'base_currency') {
            if (this.filtersSelected[key].indexOf(item['Base Currency']) > -1) {
              UpdatedArr3.push(item);
              newArr = [...UpdatedArr3];
              this.dataSource = new MatTableDataSource(UpdatedArr3);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }
        }
      });
      // newArr = [...UpdatedArr3];
      // if (UpdatedArr3.length === 0) {
      //   newArr = [...UpdatedArr3];//to check third filter length 0
      //   this.dataSource = new MatTableDataSource(newArr);
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // }
    }
    else {
      UpdatedArr3 = [...newArr];
      this.dataSource = new MatTableDataSource(UpdatedArr3);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    console.log(newArr);
    console.log(UpdatedArr2);
    this.selectedFilterList.emit(this.filtersSelected);
  }

  selectFilter(filter) {
    var allFilters = this.getAllFilters(this.data);
    // Push in filtersSelected
    for (let key in allFilters) {
      // for(keys in filtersSelected){
      if (allFilters[key].hasOwnProperty(filter)) {
        this.filtersSelected[key].push(filter);
      }
      // }
    }
    console.log(this.filtersSelected);
    this.updateData(this.data);
  }

  gotoTransaction() {
    console.log(' go to transaction ');
    this.router.navigate(['/accountService/accountDetails/transaction']);
  }
  groupByDate() {

    this.isTransctionGroup = true;
    this.tableView = false;
    const grouped = this.groupBy(this.data, transaction => transaction.Date);
    console.log("date:", grouped);
    this.isGroupBy = true;
    this.dateGroup0 = grouped.get("23 Aug 2019");
    this.dateGroup1 = grouped.get("17 Aug 2019");
    this.dateGroup2 = grouped.get("18 Feb 2019");
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}


