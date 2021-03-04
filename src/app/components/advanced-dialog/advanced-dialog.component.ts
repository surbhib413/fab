import { Component, OnInit, Inject, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-advanced-dialog",
  templateUrl: "./advanced-dialog.component.html",
  styleUrls: ["./advanced-dialog.component.scss"]
})
export class AdvancedDialogComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [
    "Status",
    "Amount",
    "Initiation Date",
    "Role",
    "Region",
    "Currency",
    "Beneficiary",
    "Expiry",
    "Status Quo Since",
    "SKU",
    "Purchase Items",
    "Name of the Insurance Company"
  ];
  options1: string[] = [
    "Saved as draft",
    "Submitted to Bank(for review)",
    "Acknowledged(Accepted by Bank)",
    "Pending Authorized",
    "Submitted to Bank(For authorization)",
    "Submitted to Bank",
    "Processed by Bank",
    "Returned to GHQ for correction",
    "Approaching Expiry",
    "Expired"
  ];
  options2: string[] = ["Include", "Exclude"];
  filterLcFormList = [];
  statusResult = [];
  toggleFilterFormList = [];
  lcFormList = []
  isDraftTrue: boolean = false;
  selectedLevel: any;
  @Output() advanceFilterEvent = new EventEmitter<object>();
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.selectedLevel = "";
  }

  applyFilter() {
    console.log("Lc list", this.data);
    this.toggleFilterFormList = this.data;
    this.applyStatusFilter("save_as_draft");
  }

  getPosts(value) {
    this.selectedLevel = value;
    console.log(this.selectedLevel)
  }

  applyStatusFilter(filterValue) {
    this.toggleFilterFormList = this.data;
    // console.log(this.data);
    console.log("This is filter value", filterValue);
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
      filterList = this.toggleFilterFormList;
    }
    var result = filterList.filter(element => {
      console.log("element status", element.status);
      if (filterValue === "save_as_draft" && this.selectedLevel === "Include") {
        this.isDraftTrue = true;
        return element.status === filterValue;
      }
      else if ((filterValue === "save_as_draft") && (this.selectedLevel === "Exclude")) {

        return (element.status !== "save_as_draft");
      }
      // else if(filterValue ==="submitted_to_bank_for_review"){
      //   this.isBankReviewTrue=true;
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="returned_to_ghq_for_correction"){
      //   this.isReturned=true;
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="not_processed"){
      //   this.isNotProcessed = true;
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="acknowledged"){
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="pending authorized"){
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="submitted_to_bank_for_authorization"){
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="processed_by_bank"){
      //   return element.status === filterValue;
      // }

      // else if(filterValue ==="approaching_expiry"){
      //   return element.status === filterValue;
      // }
      // else if(filterValue ==="expired"){
      //   return element.status === filterValue;
      // }
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
        this.statusResult = result;
      }
    }
    else {
      this.filterLcFormList = [];
      this.lcFormList = [];
    }
    console.log("this.filterLcFormList", this.lcFormList);
    this.advanceFilterEvent.emit({ "list": this.lcFormList, "status": this.isDraftTrue });
  }
}
