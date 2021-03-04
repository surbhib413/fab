import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LcFormService } from 'src/app/service/lc-form.service';
import { PrefernceFormService } from '../../service/prefernce-form.service';
import { SharedService } from 'src/app/service/shared.service';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material'

export interface Countries {
  name: string,
  class: string,
  abbrv: string
}

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  @Input() lcForm: FormGroup;
  @Input() general: FormGroup;
  @Output() messageEvent = new EventEmitter<string>();
  options: string[] = ['One', 'Two', 'Three'];
  bankNameArray: Array<any> = [];
  issuerRefArray: Array<any> = [];
  beneficiaryNameArray: Array<any> = [];
  isSwiftSelected: boolean = false;
  //showCommentVar: boolean = false;
  showComment: string;
  mapped_applicant_name: string;
  myControl = new FormControl();
  role: string;
  isChecker: boolean = false;
  lcComment: any;
  minDate = new Date();
  applCountryFlag: any;
  applCountryAbbr: any;
  benificiaryFlag: any;
  benificiaryAbbr: any;

  countries: Countries[] = [
    { name: 'United States of America', class: 'flag-icon-us', abbrv: 'USA' },
    { name: 'United Arab Emirates', class: 'flag-icon-ae', abbrv: 'AE' },
    { name: 'Greece', class: 'flag-icon-gr', abbrv: 'GR' },
    { name: 'Turkey', class: 'flag-icon-tr', abbrv: 'TR' },
    { name: 'United Kingdom', class: 'flag-icon-gb', abbrv: 'GB' },
    { name: 'Japan', class: 'flag-icon-jp', abbrv: 'JP' },
    { name: 'India', class: 'flag-icon-in', abbrv: 'IN' },
    { name: 'Israel', class: 'flag-icon-il', abbrv: 'IL' },
    { name: 'South Korea', class: 'flag-icon-kr', abbrv: 'KR' },
    { name: 'Russia', class: 'flag-icon-ru', abbrv: 'RU' },
  ];


  filteredOptions: Observable<Countries[]>;

  constructor(private lcFormService: LcFormService, private sharedService: SharedService,
    private preferenceFormService: PrefernceFormService) {
    this.role = localStorage.getItem('role');
    if (this.role === "maker") {
      this.isChecker = false;
    } else {
      this.isChecker = true;
    }
  }

  ngOnInit() {
    //console.log("General checking",this.lcForm.value);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.countries.slice())
      );
    this.preferenceFormService.isSwiftOpen.subscribe(res => {
      this.isSwiftSelected = res;
    });
    this.lcFormService.getGeneralBankName((res) => {
      this.bankNameArray = res.data.getBankName;
      // console.log("Get Bank Name resp",this.bankNameArray);
    });

    this.lcFormService.getIssuerReference((res) => {
      this.issuerRefArray = res.data.getIssuerRefrence;
      // console.log("Get IssuerReference",this.issuerRefArray);
    });

    this.lcFormService.getBeneficiaryName((res) => {
      this.beneficiaryNameArray = res.data.getBeneficiaryName;
      //console.log("Get IssuerReference",res.beneficiaryNameArray);
    });

    this.sharedService.lcCommentService.subscribe(res => {
      this.lcComment = res;
    });

    this.sharedService.showCommentService.subscribe(res => {
      this.showComment = res;
    });

    if (this.lcForm) {
      this.lcForm.get('general').valueChanges.pipe(debounceTime(1000)).subscribe(formData => {
        if (this.lcForm.get('general').valid) {
          this.lcForm.get('general').value.valid = true;
        } else {
          this.lcForm.get('general').value.valid = false;
        }
      });
      this.lcForm.get('general').valueChanges.subscribe(formData => {
        let applcountry = this.general.value.applicant_country;
        if (applcountry) {
          let c = this.countries.filter(sc => {
            return sc.name === applcountry;
          });
          if (c.length > 0) {
            this.applCountryAbbr = c[0].abbrv;
            this.applCountryFlag = c[0].class;
          }
        }

        let bencountry = this.general.value.beneficiary_country;
        if (bencountry) {
          let c = this.countries.filter(sc => {
            return sc.name === bencountry;
          });
          if (c.length > 0) {
            this.benificiaryAbbr = c[0].abbrv;
            this.benificiaryFlag = c[0].class;
          }
        }
      });
    }
  }

  displayFn(countries?: Countries): string | undefined {
    return countries ? countries.name : undefined;
  }


  onCountryChange(selectedVal: any, section: string) {
    this.setCountryFlag(selectedVal.option.value, section);
  }
  clearFlag(e: any, section: string) {
    if (section === 'applicant') {
      this.applCountryFlag = '';
      this.applCountryAbbr = '';
    }
    else if (section === 'beneficiary') {
      this.benificiaryFlag = '';
      this.benificiaryAbbr = '';
    }

    this.setCountryFlag(e.target.value, section);
  }
  setCountryFlag(val: any, section: string) {
    let country = this.countries.filter(sc => {
      return sc.name === val;
    });
    if (country.length > 0) {
      if (section === 'applicant') {
        this.applCountryFlag = country[0].class;
        this.applCountryAbbr = country[0].abbrv;
      }
      else if (section === 'beneficiary') {
        this.benificiaryFlag = country[0].class;
        this.benificiaryAbbr = country[0].abbrv;
      }
    }
  }

  private _filter(name: string): Countries[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  // send audit logs to lc form component
  sendAuditLog(field, prevValue, currValue) {

    if (prevValue != currValue)
      this.messageEvent.emit(JSON.stringify({ field: field, curr: currValue }))
  }


  selectSwift() {
    this.isSwiftSelected = true;
  }

  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;
  //  myControl1 = new FormControl();

  //  activeOption
  // benCountryMapping(a)
  //  {
  // //   //alert(a);
  //    this.myControl1.setValue(a);

  //  }

  benCountryMapping(a) {
    this.lcForm.patchValue({
      general: {
        lc_placeOfExpiry: a
      }
    })
  }


  selectCourier() {
    this.isSwiftSelected = false;
  }

  openComment(position, fieldId, fieldName) {
    console.log("open comment in general", position, fieldId, fieldName);
    this.updateCommentDetails({ position: position, id: fieldId, fieldName: fieldName });
    this.sharedService.updateShowComment(fieldId);
  }

  updateCommentDetails(commentDetails) {
    this.sharedService.updateCommentDetails(commentDetails);
  }

  selectIssuerRef(val) {
    this.lcFormService.getIssuerReference((res) => {
      var issuerRefArray = this.issuerRefArray;
      console.log(issuerRefArray);
      var getSelectedIssuerRefData = issuerRefArray.filter(issuerRefData => issuerRefData.issuer_reference === val);
      var applicant_name = getSelectedIssuerRefData[0]['name'];
      var address_line1 = getSelectedIssuerRefData[0]['address_line1'];
      var address_line2 = getSelectedIssuerRefData[0]['address_line2'];
      var address_line3 = getSelectedIssuerRefData[0]['address_line3'];
      this.lcForm.patchValue({
        general: {
          applicant_addressLine1: address_line1,
          applicant_addressLine2: address_line2,
          applicant_addressLine3: address_line3,
          applicant_name: applicant_name
        }
      })
    })
  }


}
