import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LcFormService } from 'src/app/service/lc-form.service';
import { FileHandle } from '../../directives/dragDrop.directive';
import { PrefernceFormService } from '../../service/prefernce-form.service';
import { SharedService } from 'src/app/service/shared.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  //@ViewChild('currencyEle') currencyEle: ElementRef;

  @Input() payment: FormGroup;
  @Input() lcForm : FormGroup;
  role:string;
  isChecker:boolean = false;
  lcComment : any;
  isSwiftSelected:boolean = false;
  showComment:string;
  currencySymbol : any;
  countryFlag : any;
  countryAbbr : any;
  currencyAbbr : any;

  countries = [
    {name:'United States of America', class:'flag-icon-us', abbrv:'USA'},
    {name:'United Arab Emirates', class:'flag-icon-ae', abbrv:'AE'},
    {name:'Greece', class:'flag-icon-gr', abbrv:'GR'},
    {name:'Turkey', class:'flag-icon-tr', abbrv:'TR'},
    {name:'United Kingdom', class:'flag-icon-gb', abbrv:'GB'},
    {name:'Japan', class:'flag-icon-jp', abbrv:'JP'},
    {name:'India', class:'flag-icon-in', abbrv:'IN'},
    {name:'Israel', class:'flag-icon-il', abbrv:'IL'},
    {name:'South Korea', class:'flag-icon-kr', abbrv:'KR'},
    {name:'Russia', class:'flag-icon-ru', abbrv:'RU'},
    ];
  // currencies = [
  //     {name:'Dollars', class:'fa-dollar-sign', abbrv:'USD'},
  //     {name:'Dirhams', class:'fa-dollar-sign opacity-zero', abbrv:'AED'},
  //     {name:'Euro', class:'fa-euro-sign', abbrv:'EUR'},
  //     {name:'Turkey', class:'fa-lira-sign', abbrv:'TRY'},
  //     {name: 'United Kingdom', class:'fa-pound-sign', abbrv:'GBP'},
  //     {name: 'Japanese yen', class:'fa-yen-sign', abbrv:'JPY'},
  //     {name: 'Indian rupee', class:'fa-rupee-sign', abbrv:'INR'},
  //     {name: 'Israeli new shekel', class:'fa-shekel-sign', abbrv:'ILS'},
  //     {name: 'South Korean won', class:'fa-won-sign', abbrv:'KRW'},
  //     {name: 'Russian ruble', class:'fa-ruble-sign', abbrv:'RUB'},
  //     ];

  currencies = [
    {name:'Dollars', src:'assets/icons/dollar-currency-symbol.svg', abbrv:'USD'},
    {name:'Dirhams', src:'', abbrv:'AED'},
    {name:'Euro', src:'assets/icons/euro-currency-symbol.svg', abbrv:'EUR'},
    {name:'Turkey', src:'assets/icons/turkish-lire-symbol.svg', abbrv:'TRY'},
    {name: 'United Kingdom', src:'assets/icons/pound-sterling.svg', abbrv:'GBP'},
    {name: 'Japanese yen', src:'assets/icons/yen-symbol.svg', abbrv:'JPY'},
    {name: 'Indian rupee', src:'assets/icons/rupee-indian.svg', abbrv:'INR'},
    {name: 'Israeli new shekel', src:'assets/icons/israel-shekel-currency-symbol.svg', abbrv:'ILS'},
    {name: 'South Korean won', src:'assets/icons/south-korean-won.svg', abbrv:'KRW'},
    {name: 'Russian ruble', src:'assets/icons/russian-rublo.svg', abbrv:'RUB'},
    ];

  constructor(private sharedService : SharedService,private preferenceFormService: PrefernceFormService) {
    this.role = localStorage.getItem('role');
    if(this.role === "maker"){
      this.isChecker = false;
    }else{
      this.isChecker = true;
    }
  }

  ngOnInit() {
    this.preferenceFormService.isSwiftOpen.subscribe(res => {
      this.isSwiftSelected = res;
      })
    this.sharedService.lcCommentService.subscribe(res => {
      this.lcComment= res;
    })
    this.sharedService.showCommentService.subscribe(res => {
      this.showComment= res;
    })

    this.lcForm.get('payment').valueChanges.pipe(debounceTime(1000)).subscribe(formData => {
      if(this.lcForm.get('payment').valid){
        this.lcForm.get('payment').value.valid = true;
      }else{
        this.lcForm.get('payment').value.valid = false;
      }
    });

    this.lcForm.get('payment').valueChanges.subscribe(formData => {
      let currency = this.payment.value.amount_currency;
      if(currency){
        let c = this.currencies.filter(sc => {
          return sc.name === currency;
        });
        if(c.length>0){
          this.currencyAbbr = c[0].abbrv;
          this.currencySymbol = c[0].src;
        }
      }
      let country = this.payment.value.amount_country;
      if(country){
        let c = this.countries.filter(sc => {
          return sc.name === country;
        });
        if(c.length>0){
          this.countryAbbr = c[0].abbrv;
          this.countryFlag = c[0].class;
        }
      }
    });

  }

  onCountryChange(selectedVal : any){
    this.setCountryFlag(selectedVal.option.value);
  }
  clearFlag(e: any){
    this.countryFlag ='';
    this.countryAbbr = '';
    this.setCountryFlag(e.target.value);
  }
  setCountryFlag(val:any){
    let country = this.countries.filter(sc => {
      return sc.name === val;
    });
    if(country.length>0){
      this.countryFlag = country[0].class;
      this.countryAbbr = country[0].abbrv;
    }
  }

  onCurrencyChange(selectedVal : any){
    this.setCurrencySymbol(selectedVal.option.value);
  }
  clearCurrency(e: any){
    this.currencySymbol ='';
    this.currencyAbbr = '';
    this.setCurrencySymbol(e.target.value);
  }
  setCurrencySymbol(val:any){
    let currency = this.currencies.filter(sc => {
      return sc.name === val;
    });
    if(currency.length>0){
      this.currencySymbol = currency[0].src;
      this.currencyAbbr = currency[0].abbrv;
    }
  }

  openComment(position,fieldId,fieldName){
    this.updateCommentDetails({position:position,id:fieldId,fieldName:fieldName});
    //this.sharedService.updateShowComment(true);
    this.sharedService.updateShowComment(fieldId);
  }

  updateCommentDetails(commentDetails) {
    this.sharedService.updateCommentDetails(commentDetails);
  }

}

