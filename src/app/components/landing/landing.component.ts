import { SortLcData } from '../../service/sort-lc-data.pipe';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service'
import { LcFormService } from 'src/app/service/lc-form.service';
import { Output, EventEmitter, ValueProvider } from '@angular/core';
import { CreateLcDialogComponent } from '../create-lc-dialog/create-lc-dialog.component';
import { DatePipe } from '@angular/common';
var moment = require('moment');
import { MatDialog, MatPaginator } from '@angular/material';
import { PrefernceFormService } from '../../service/prefernce-form.service';
import { AdvancedDialogComponent } from "../advanced-dialog/advanced-dialog.component";
import { ArrayType } from '@angular/compiler';
import { MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
// import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

// class Product { status: boolean; uuid: string };

export class LandingComponent implements OnInit {

  // columns: string[] = ['checkBox', 'status', 'lcName', 'type', 'id', 'role', 'general', 'payment', 'bankAndOtherParty', 'shipment', 'narrative', 'review', 'attachment'];

  displayedColumns: string[] = ['checkBox', 'status', 'id', 'general', 'payment', 'bankAndOtherParty', 'shipment', 'narrative', 'review', 'issueDate', 'expiryDate', 'ofAmends', 'ofPayments'];
  displayedColumnsNames: string[] = ['checkBox', 'status', 'id', 'general', 'payment', 'bankAndOtherParty', 'shipment', 'narrative', 'review', 'issueDate', 'expiryDate', 'ofAmends', 'ofPayments'];

  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() searchItem: EventEmitter<any> = new EventEmitter();

  todayDate: any;
  current_timestamp: any;
  date2: any;
  showCheckboxVar: boolean = false;
  selectAllVar: boolean = false;
  userId: string;
  lcFormList = [];
  filterLcFormList = [];
  toggleFilterFormList = [];
  statusResult = [];
  amountResult = [];
  expiryResult = [];
  applySelectOne: boolean = false;
  applySelectAll: boolean = false;
  isListView: boolean = true;
  isTableView: boolean = false;
  viewType: string = "List View";
  previousIndex: number;
  isGroupBy: boolean = false;
  bGroup0 = [];
  bGroup1 = [];
  bGroup2 = [];

  myarray = [];

  lcFormListLength = 0;
  statusMap = {
    'save_as_draft': 'saved as draft',
    'submitted_to_bank_for_review': 'submitted to bank for review',
    'acknowledged': 'acknowledged by bank',
    'pending_authorized': 'authorization pending',
    'submitted_to_bank_for_authorization': 'submitted to bank for authorization',
    'processed_by_bank': 'processed by bank',
    'not_processed': 'not processed',
    'returned_to_ghq_for_correction': 'returned to ghq for correction',
    'approaching_expiry': 'approaching expiry',
    'expired': 'exprired'
  }

  pageIndex: number = 0;
  pageSize: number = 20; //Initialize to 20 because preferences has this as the default option.
  lowValue: number = 0;
  highValue: number = 20;

  role: string;
  // orderByStr:string = "general_info.beneficiary_detail.name";
  orderByStr: string = "payment_detail.amount_charges.lc_amount";
  isDraftTrue: boolean = false;
  isBankReviewTrue: boolean = false;
  isReturned: boolean = false;
  isNotProcessed: boolean = false;

  isLowAmountTrue: boolean = false;
  isMidAmountTrue: boolean = false;
  isHighAmountTrue: boolean = false;
  isHigherAmountTrue: boolean = false;

  isLowDaysTrue: boolean = false;
  isMidDaysTrue: boolean = false;
  isHighDaysTrue: boolean = false;
  isHigherDaysTrue: boolean = false;

  // orderByStrArr = [];
  statusCountMap = {}
  lcAmountCountMap = {}
  lcExpiryCountMap = {}

  frequentFilter:boolean = false;
  constructor(private router: Router, private lcFormService: LcFormService, private sharedService: SharedService, public dialog: MatDialog, private sortLcData: SortLcData, private preferenceForm: PrefernceFormService, private datePipe: DatePipe) {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    if (this.role === "maker") {
      this.getLcFormsByUserId(this.userId);
    } else {
      this.getLcFormsByCheckerId(this.userId);
    }

  }

  isShown: boolean = true;
  showLcName: boolean = false;
  showLcType: boolean = false;
  showLcId: boolean = false;
  showLcRole: boolean = false;
  showStatusQuo: boolean = false;

  ngOnInit() {
    this.preferenceForm.isTabDataService.subscribe(res => {
      this.isShown = res;
    })

    this.preferenceForm.isisLcNameService.subscribe(res => {
      // alert(res);
      this.showLcName = res;
    })


    this.preferenceForm.isStatusQuoService.subscribe(res => {

      this.showStatusQuo = res;
    })
    this.preferenceForm.isisTypeService.subscribe(res => {
      this.showLcType = res;
    })
    this.preferenceForm.isLcRoleService.subscribe(res => {
      this.showLcRole = res;
    })

    this.preferenceForm.isLcIdService.subscribe(res => {
      this.showLcId = res;
    })
    // this.sharedService.serviceUserId.subscribe(res => {
    //   this.userId= res;
    // })
    this.getLcformStatusCount()

    this.getLcFormAmountCount()

    this.getLcFormExpiryCount()

    this.preferenceForm.updateLcPerPageService.subscribe(res => {
      this.pageSize = res;
      this.highValue = res;
    })
  }

  getPaginatorData(event) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  resetPaginatorToOne() {
    this.paginator.pageIndex = 0;
    this.lowValue = 0;
    this.highValue = this.pageSize;
  }

  goToLCForm(uuid: string, lc_id: string) {

    this.sharedService.appendLcIdInBreadcrumb(true);
    this.sharedService.appendBreadcrumb(false);
    this.sharedService.appendLcId(lc_id);
    this.router.navigate(['/dashboard/lcForm', uuid]);

  }


  goToLCFormTable(row) {

    this.sharedService.appendLcIdInBreadcrumb(true);
    this.sharedService.appendBreadcrumb(false);
    this.sharedService.appendLcId(row.common_info.lc_id);
    this.router.navigate(['/dashboard/lcForm', row.uuid]);

  }

  // goToLCForm(row) {
  //   // console.log(row);
  //   // console.log(row.common_info.lc_id);
  //   this.sharedService.appendLcId(row.lc_id);
  //   this.router.navigate(['/dashboard/lcForm', row.uuid]);
  // }

  clearFilters() {
    this.isDraftTrue = false;
    this.isBankReviewTrue = false;
    this.isReturned = false;
    this.isNotProcessed = false;

    this.isLowAmountTrue = false;
    this.isMidAmountTrue = false;
    this.isHighAmountTrue = false;
    this.isHigherAmountTrue = false;

    this.isLowDaysTrue = false;
    this.isMidDaysTrue = false;
    this.isHighDaysTrue = false;
    this.isHigherDaysTrue = false;
    this.lcFormList = this.toggleFilterFormList
    this.filterLcFormList = [];
    this.statusResult = [];
    this.amountResult = [];
    this.expiryResult = [];
    this.isGroupBy = false;
    this.bGroup0 = [];
    this.bGroup1 = [];
    this.bGroup2 = [];
  }

  displayFilter() {
    this.clearFilters();
    let dialogRef = this.dialog.open(AdvancedDialogComponent, {
      panelClass: 'advance-dialog',
      data: this.lcFormList
    });

    const sub = dialogRef.componentInstance.advanceFilterEvent.subscribe((receivedEntry) => {
      // console.log("This is receive entry",receivedEntry.list);
      // console.log("this is filter status",receivedEntry.status);
      this.lcFormList = receivedEntry.list;
      if (receivedEntry.status == true) {
        this.isDraftTrue = true;
      }
      else {
        this.isBankReviewTrue = true;
        this.isReturned = true;
        this.isNotProcessed = true;

        this.isLowAmountTrue = true;
        this.isMidAmountTrue = true;
        this.isHighAmountTrue = true;
        this.isHigherAmountTrue = true;

        this.isLowDaysTrue = true;
        this.isMidDaysTrue = true;
        this.isHighDaysTrue = true;
        this.isHigherDaysTrue = true;
      }
    });
  }

  toggleFrequentFilter(): void {
    this.frequentFilter = !this.frequentFilter;
  }

  applyStatusFilter(filterValue) {
    var filterList = [];
    if (this.filterLcFormList.length > 0) {
      if (this.statusResult.length > 0) {
        filterList = this.toggleFilterFormList;
      }
      else {
        filterList = this.filterLcFormList;
      }
    }
    else {
      if (this.amountResult.length > 0) {
        filterList = filterList.concat(this.amountResult);
      }
      if (this.expiryResult.length > 0) {
        filterList = filterList.concat(this.expiryResult);
      } else if ((this.expiryResult.length == 0) && (this.amountResult.length == 0)) {
        filterList = this.toggleFilterFormList;
      }
    }
    var result = filterList.filter(element => {
      if (filterValue === "save_as_draft") {
        this.isDraftTrue = true;
        return element.status === filterValue;
      }
      else if (filterValue === "submitted_to_bank_for_review") {
        this.isBankReviewTrue = true;
        return element.status === filterValue;
      }
      else if (filterValue === "returned_to_ghq_for_correction") {
        this.isReturned = true;
        return element.status === filterValue;
      }
      else if (filterValue === "not_processed") {
        this.isNotProcessed = true;
        return element.status === filterValue;
      }
      else if (filterValue === "acknowledged") {
        return element.status === filterValue;
      }
      else if (filterValue === "pending authorized") {
        return element.status === filterValue;
      }
      else if (filterValue === "submitted_to_bank_for_authorization") {
        return element.status === filterValue;
      }
      else if (filterValue === "processed_by_bank") {
        return element.status === filterValue;
      }

      else if (filterValue === "approaching_expiry") {
        return element.status === filterValue;
      }
      else if (filterValue === "expired") {
        return element.status === filterValue;
      }
    })

    if (result.length > 0) {
      // console.log("Filtered List",result);
      if (this.filterLcFormList.length > 0) {
        if (this.statusResult.length > 0) {
          this.filterLcFormList = this.filterLcFormList.concat(result);
          this.lcFormList = this.filterLcFormList;
        }
        else {
          this.filterLcFormList = result;
          this.lcFormList = this.filterLcFormList
        }

      }
      else {
        this.filterLcFormList = result;
        this.lcFormList = this.filterLcFormList;
        this.statusResult = this.statusResult.concat(result);
      }
    }
    else {
      if (this.statusResult.length > 0) {

      } else {
        this.filterLcFormList = [];
        this.lcFormList = [];
      }
    }
    // console.log("this.filterLcFormList",this.lcFormList);
  }

  applyAmountFilter(filterValue) {
    // console.log("filterValue",filterValue);
    var filterList = [];
    if (this.filterLcFormList.length > 0) {
      if (this.amountResult.length > 0) {
        filterList = this.toggleFilterFormList;
      }
      else {
        filterList = this.filterLcFormList;
      }
    }
    else {
      if (this.statusResult.length > 0) {
        filterList = this.statusResult;
      }
      if (this.expiryResult.length > 0) {
        filterList = filterList.concat(this.expiryResult);
      } else if ((this.expiryResult.length == 0) && (this.statusResult.length == 0)) {
        filterList = this.toggleFilterFormList;
      }
      //filterList =this.toggleFilterFormList;
    }
    var result = filterList.filter(element => {
      if (filterValue === "lowAmount") {
        this.isLowAmountTrue = true;
        return (element.payment_detail.amount_charges.lc_amount <= 50000);
      }
      else if (filterValue === "midAmount") {
        this.isMidAmountTrue = true;
        return ((element.payment_detail.amount_charges.lc_amount > 50000) && (element.payment_detail.amount_charges.lc_amount <= 200000));
      }
      else if (filterValue === "highAmount") {
        this.isHighAmountTrue = true;
        return ((element.payment_detail.amount_charges.lc_amount > 200000) && (element.payment_detail.amount_charges.lc_amount <= 500000));
      }
      else if (filterValue === "higherAmount") {
        this.isHigherAmountTrue = true;
        return (element.payment_detail.amount_charges.lc_amount > 500000);
      }
    })

    if (result.length > 0) {
      // console.log("Filtered List",result);
      if (this.filterLcFormList.length > 0) {
        if (this.amountResult.length > 0) {
          this.filterLcFormList = this.filterLcFormList.concat(result);
          this.lcFormList = this.filterLcFormList;
        }
        else {
          this.filterLcFormList = result;
          this.lcFormList = this.filterLcFormList;
        }

      }
      else {
        this.filterLcFormList = result;
        this.lcFormList = this.filterLcFormList;
        this.amountResult = this.amountResult.concat(result);
      }
    }
    else {
      if (this.amountResult.length > 0) {

      } else {
        this.filterLcFormList = [];
        this.lcFormList = [];
      }
    }
    // console.log("this.filterLcFormList",this.lcFormList);
  }

  applyExpireFilter(filterValue) {
    var filterList = [];
    if (this.filterLcFormList.length > 0) {
      if (this.expiryResult.length > 0) {
        filterList = this.toggleFilterFormList;
      }
      else {
        filterList = this.filterLcFormList;
      }
    }
    else {
      if (this.statusResult.length > 0) {
        filterList = filterList.concat(this.statusResult);
      }
      if (this.amountResult.length > 0) {
        filterList = filterList.concat(this.amountResult);
      }
      else if ((this.statusResult.length == 0) && (this.amountResult.length == 0)) {
        filterList = this.toggleFilterFormList;
      }
      //filterList =this.toggleFilterFormList;
    }
    var result = filterList.filter(element => {
      if (filterValue === 'lowDays') {
        this.isLowDaysTrue = true;

        this.current_timestamp = new Date();
        this.todayDate = new Date(element.general_info.lc_detail.expiry_date);
        var timeDiff = Math.abs(this.todayDate.getTime() - this.current_timestamp.getTime());
        var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (diff < 7) {
          // console.log("No of Days",diff);
          return element.general_info.lc_detail.expiry_date;
        }
      }
      else if (filterValue === 'midDays') {
        this.isMidDaysTrue = true;
        this.current_timestamp = new Date();
        this.todayDate = new Date(element.general_info.lc_detail.expiry_date);
        var timeDiff = Math.abs(this.todayDate.getTime() - this.current_timestamp.getTime());
        var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if ((diff > 7) && (diff <= 30)) {
          // console.log("No of Days",diff);
          return element.general_info.lc_detail.expiry_date;
        }
      }
      else if (filterValue === 'highDays') {
        this.isHighDaysTrue = true;

        this.current_timestamp = new Date();
        this.todayDate = new Date(element.general_info.lc_detail.expiry_date);
        var timeDiff = Math.abs(this.todayDate.getTime() - this.current_timestamp.getTime());
        var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if ((diff > 30) && (diff <= 60)) {
          // console.log("No of Days",diff);
          return element.general_info.lc_detail.expiry_date;
        }
      }
      else if (filterValue === 'higherDays') {
        this.isHigherDaysTrue = true;
        this.current_timestamp = new Date();
        this.todayDate = new Date(element.general_info.lc_detail.expiry_date);
        var timeDiff = Math.abs(this.todayDate.getTime() - this.current_timestamp.getTime());
        var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if ((diff > 60) && (diff <= 90)) {
          // console.log("No of Days",diff);
          return element.general_info.lc_detail.expiry_date;
        }
      }
    })

    if (result.length > 0) {
      // console.log("Filtered List",result);
      if (this.filterLcFormList.length > 0) {
        if (this.expiryResult.length > 0) {
          this.filterLcFormList = this.filterLcFormList.concat(result);
          this.lcFormList = this.filterLcFormList;
        }
        else {
          this.filterLcFormList = result;
          this.lcFormList = this.filterLcFormList;
        }

      }
      else {
        this.filterLcFormList = result;
        this.lcFormList = this.filterLcFormList;
        this.expiryResult = this.expiryResult.concat(result);
      }
    }
    else {
      if (this.expiryResult.length > 0) {

      } else {
        this.filterLcFormList = [];
        this.lcFormList = [];
      }
    }
    // console.log("this.filterLcFormList",this.lcFormList);  
  }

  appendLcBreadcrumb(val: boolean) {
    this.openDialog();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateLcDialogComponent, {
      panelClass: 'create-new-lc-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  orderByBeneficiaryName(selected: string) {
    this.orderByStr = selected;
    //  alert("selected"+this.orderByStr);

  }

  /**
   * get LcForms ByU serId
   * @param user_id
   * @returns lc form list
   */
  getLcFormsByUserId(user_id) {
    this.lcFormService.getLcFormsByUserId((resp, err) => {
      if (resp) {
        console.log("resp", resp)
        this.lcFormList = resp;
        this.toggleFilterFormList = resp;
        this.lcFormListLength = this.lcFormList.length;
        this.dataSource = new MatTableDataSource(this.lcFormList);
        this.dataSource.paginator = this.paginator;

      }
      if (err)
        console.log(err)
    }, user_id)
  }

  getLcFormsByCheckerId(user_id) {
    this.lcFormService.getLcFormsByCheckerId((resp, err) => {

      if (resp) {

        resp = resp.filter((element) => {
          return element.status != 'save_as_draft'
        });
        this.lcFormList = resp
        this.toggleFilterFormList = resp;
        this.lcFormListLength = this.lcFormList.length;
        // lcFormsToShowPerPage = this will comw from preferences!
      }
      if (err)
        console.log(err)
    }, user_id)
  }



  showCheckbox() {
    this.showCheckboxVar = !this.showCheckboxVar;
  }

  selectOne(uuidValue) {
    console.log("select one uuid", uuidValue);
    this.applySelectOne = !this.applySelectOne;
  }

  selectAllFn() {
    console.log("Select All", this.selectAllVar);
    this.selectAllVar = !this.selectAllVar;
    this.applySelectAll = !this.applySelectAll;
    this.showCheckboxVar = true;
  }

  // getGreenValue(form){
  //   if(form.general_info.valid && form.general_info.visited && form.payment_detail.valid && form.payment_detail.visited && form.bank_other_party_detail.valid && form.bank_other_party_detail.visited && form.shipment_detail.valid && form.shipment_detail.visited && form.narrative_detail.valid && form.narrative_detail.visited)
  //   return true;
  //   else
  //   return false;
  // }

  // getYellowValue(form){
  //   if(form.general_info.valid || form.general_info.visited || form.payment_detail.valid || form.payment_detail.visited || form.bank_other_party_detail.valid || form.bank_other_party_detail.visited || form.shipment_detail.valid || form.shipment_detail.visited || form.narrative_detail.valid || form.narrative_detail.visited)
  //   return true;
  //   else
  //   return false;
  // }
  // dummy stuff
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  // dummy stuff

  getLcformStatusCount() {
    this.lcFormService.getLcFormStatusCount()
      .subscribe(res => {
        // this.lcFormStatusCount = res['data']
        // console.log(this.lcFormStatusCount)
        for (let object of res['data']) {
          this.statusCountMap[object._id] = object.count
        }
        // console.log(this.statusCountMap)
      }, err => {
        console.log(err)
      })
  }

  getLcFormAmountCount() {
    this.lcFormService.getLcFormAmountCount()
      .subscribe(res => {
        for (let object of res['data']) {
          this.lcAmountCountMap[object._id] = object.count
        }
        console.log(this.lcAmountCountMap)
      }, err => {
        console.log(err)
      })
  }

  getLcFormExpiryCount() {
    this.lcFormService.getLcFormExpiryCount()
      .subscribe(res => {
        for (let object of res['data']) {
          this.lcExpiryCountMap[object._id] = object.count
        }
        console.log(this.lcExpiryCountMap)
      }, err => {
        console.log(err)
      })
  }

  statusDays(status_date) {
    var difference = status_date - Date.now();
    var daysDifference = Math.floor(Math.abs(difference/1000/60/60/24));
    //return status_date ? Math.floor((Date.now() - status_date) / (1000 * 3600 * 24)) : 0
    return status_date ? daysDifference: 0;
  }

  changeView(viewName: string) {
    if (viewName === "tableView") {
      this.viewType = "Table View";
      this.isListView = false;
    } else {
      this.viewType = "List View";
      this.isListView = true;
    }
  }

  /* setDisplayedColumns() {
    this.displayedColumns.forEach(( column: any, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  dragStarted(event: CdkDragStart, index: number ) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
    }
  } */

  /* groupByBeneficiary(){
    // console.log(this.lcFormList);
    var previousBName: string;
    var bgroup1 = [];
    for(var i=0; i<this.lcFormList.length; i++){
      console.log(this.lcFormList[i].general_info.beneficiary_detail.name);
      var bname = this.lcFormList[i].general_info.beneficiary_detail.name;
      if(previousBName == null){
        bgroup1.push(this.lcFormList[i]);
        previousBName = bname;
        break;
      }if(previousBName == bname){
        bgroup1.push(this.lcFormList[i]);
      }
  } */

  groupByBeneficiary() {
    this.changeView('tableView');
    const grouped = this.groupBy(this.lcFormList, lc => lc.general_info.beneficiary_detail.name);
    this.isGroupBy = true;
    this.bGroup0 = grouped.get("Marthsell Adv Tech Solutions");
    this.bGroup1 = grouped.get("B A L Systems");
    this.bGroup2 = grouped.get("HH Gorsch Corp");
    // console.log(grouped.get("Marthsell Adv Tech Solutions"));
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
export interface Food {
  value: string;
  viewValue: string;
}


