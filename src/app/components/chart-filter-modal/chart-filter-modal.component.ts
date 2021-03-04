import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: "app-chart-filter-modal",
  templateUrl: "./chart-filter-modal.component.html",
  styleUrls: ["./chart-filter-modal.component.scss"]
})
export class ChartFilterModalComponent implements OnInit {
  constructor(private sharedService: SharedService) { }

  //amountList = ["Amount1", "Amount2", "Amount3", "Amount4"];
  // balanceList = ["Balance", "Item1", "Item2", "Item3", "Item4"];

  @Input() dropDownVal: any;
  @Output() updateGraph: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes) { }
  ngOnInit() { }

  closeFilter() {
    this.sharedService.updateShowFilter("none");
  }

  valueChange($event, i) {
    this.dropDownVal.list[i].checked = $event.checked;
    if (i != 0) {
      this.dropDownVal.list[0].checked = false;
    } else {
      for (let x = 1; x < this.dropDownVal.list.length; x++) {
        this.dropDownVal.list[x].checked = false;
      }
    }
  }

  applyFilter() {
    this.updateGraph.emit(this.dropDownVal);
    this.closeFilter();
  }

  selectDefault() {
    this.dropDownVal.list[0].checked = true;
    for (let x = 1; x < this.dropDownVal.list.length; x++) {
      this.dropDownVal.list[x].checked = false;
    }
  }
}
