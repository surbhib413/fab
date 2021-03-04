import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-configured-charts',
  templateUrl: './pre-configured-charts.component.html',
  styleUrls: ['./pre-configured-charts.component.scss']
})
export class PreConfiguredChartsComponent implements OnInit {
  byBank = {
    groupName: 'bank_name',
    dropDownType: 'entity_name'
  };
  byEntity = {
    groupName: 'entity_name',
    dropDownType: 'bank_name'
  };
  byCurrency = {
    groupName: 'account_base_currency',
    dropDownType: 'bank_name'
  };
  byAccountStatus = {
    groupName: 'status',
    dropDownType: 'bank_name'
  };
  topBeneficiaries = {
    groupName: 'beneficiary',
    dropDownType: 'entity_name'
  };
  topPayee = {
    groupName: 'payee',
    dropDownType: 'entity_name'
  };

  constructor() { }

  ngOnInit() {
  }
  


}
