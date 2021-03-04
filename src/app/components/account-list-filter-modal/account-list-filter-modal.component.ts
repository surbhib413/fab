import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: 'app-account-list-filter-modal',
  templateUrl: './account-list-filter-modal.component.html',
  styleUrls: ['./account-list-filter-modal.component.scss']
})
export class AccountListFilterModalComponent implements OnInit {
  constructor(private sharedService: SharedService) { }
  @Input() dropDownVal: any;
  @Output() updateAccountList: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    console.log('drop down Values in modal', this.dropDownVal);
  }

  closeFilter() {
    this.sharedService.updateAccountList("none");
  }

  valueChange($event, i) {
    this.dropDownVal.list[i].checked = $event.checked;
  }

  applyFilter() {
    this.updateAccountList.emit(this.dropDownVal);
    this.closeFilter();
  }
}
