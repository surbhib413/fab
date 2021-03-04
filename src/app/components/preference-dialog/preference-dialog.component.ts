import { Component, OnInit, Output, HostListener, EventEmitter, ViewChild } from '@angular/core';
import { PrefernceFormService } from '../../service/prefernce-form.service';
import { FormControl } from '@angular/forms';
import { MatSlideToggle ,MatRadioChange} from '@angular/material';


@Component({
  selector: 'app-preference-dialog',
  templateUrl: './preference-dialog.component.html',
  styleUrls: ['./preference-dialog.component.scss']
})
export class PreferenceDialogComponent implements OnInit {
  
  islcName:boolean = false;
  islcStatusQuo:boolean = false;
  islcType:boolean = true;
  islcRole:boolean = true;
  islcId:boolean = true;
  
  options: string[] = ['One', 'Two', 'Three'];
  lcperpages = [
    { label20: '20', selected20: true },
    { label60: '60', selected60: false },
    { label120: '120', selected120: false },
    { label999: 'Infinite Scroll', selected999: false }
  ];
  // lcperpages = [
  //   { label: 20, selected: true },
  //   { label: 60, selected: false },
  //   { label: 120, selected: false },
  //   { label: 999, selected: false }
  // ];
  lctitles = [
    { label: 'LC Name', selected: false },
    { label: 'LC Number', selected: false },
    { label: 'Status Quo', selected: false },
    { label: 'Type', selected: true },
    { label: 'Role', selected: true },
    { label: 'LC ID', selected: true }
  ];
  // lctitles = [
  //   { lcNamelabel: 'LC Name', lcNameSelected: false },
  //   { lcNumlabel: 'LC Number', lcNumSelected: false },
  //   { statusQuolabel: 'Status Quo', statusQuoSelected: false },
  //   { typelabel: 'Type', typeSelected: true },
  //   { rolelabel: 'Role', roleSelected: true },
  //   { lcIdlabel: 'LC ID', lcIdSelected: true }
  // ];
  dashfloatings = [
    { label: 'Save as Draft', selected: true },
    { label: 'Submitted to Bank (for review)', selected: true },
    { label: 'Acknowledged(accepted by bank)', selected: true },
    { label: 'Pending Authorized', selected: true },
    { label: 'Submitted to bank(for authorization)', selected: false },
    { label: 'Processed by Bank', selected: false },
    { label: 'Not Processed', selected: false },
    { label: 'Returned to GHQ for correction', selected: true },
    { label: 'Approaching Expiry', selected: false },
    { label: 'Expired', selected: false },
  ];
  dashboards = [
    { label: 'Status', selected: true },
    { label: 'Amount', selected: true },
    { label: 'Initiation Date', selected: false },
    { label: 'Role', selected: false },
    { label: 'Region', selected: false },
    { label: 'Currency of LC', selected: false },
    { label: 'Beneficiary', selected: false },
    { label: 'Expiry', selected: true },
    { label: 'Status Quo Since', selected: false },
    { label: 'SKU', selected: false },
    { label: 'Purchase Terms', selected: false },
    { label: 'Name of the Insurance', selected: false }
   ];
  constructor(private preferenceForm: PrefernceFormService) { }

  isSwiftSelected: boolean = true;
  default_check: boolean = true;
  default_check_swift: boolean = true;
  isShown: boolean = true;
  isDataShown: boolean = true;
  lcPerPage: number = 20;

  @ViewChild('slideswift')
  matSlideToggleswift: MatSlideToggle;

  @ViewChild('slidedata')
  matSlideToggle: MatSlideToggle;

  defaultCheckToggle() {
  if(!this.matSlideToggle.checked)
  this.matSlideToggle.toggle();

  if(!this.matSlideToggleswift.checked)
  this.matSlideToggleswift.toggle();


  }
  savePreferences(){

    this.preferenceForm.updateSwift(this.matSlideToggleswift.checked);
    this.preferenceForm.toggleData(this.matSlideToggle.checked);

    var cc = this.lctitles.find(person => person.label === 'LC Name');
    // console.log(cc.selected);
    this.preferenceForm.toggleLcName(cc.selected);
    var ccS = this.lctitles.find(person => person.label === 'Status Quo');
    // console.log(ccS.selected);
    this.preferenceForm.toggleStatusQuo(ccS.selected);
    var ccT = this.lctitles.find(person => person.label === 'Type');
    // console.log(ccT.selected);
    this.preferenceForm.toggleType(ccT.selected);
    var ccR = this.lctitles.find(person => person.label === 'Role');
    // console.log(ccR.selected);
    this.preferenceForm.toggleLcRole(ccR.selected);
    var ccL = this.lctitles.find(person => person.label === 'LC ID');
    // console.log(ccL.selected);
    this.preferenceForm.toggleLcId(ccL.selected);

    // var ccP = this.lcperpages.find(person => person.selected === true);
    this.preferenceForm.updatePaginator(this.lcPerPage);


  }

  setLcPerPage(lcPerPageFromUser: number){
    this.lcPerPage = lcPerPageFromUser;
  }

//   RadioChange(event: MatRadioChange) {
//     var cc = this.lcperpages.findIndex(person => person.selected === true);
//     this.lcperpages[cc].selected = false;
//     var ccc = this.lcperpages.findIndex(person => person.label === event.value);
//     this.lcperpages[ccc].selected = true;
// }

  // getCheckboxes(){
  //   console.log("getchckbox");
  //   console.log(this.lctitles.filter(x => x.selected === true).map(x => x.label));
  //   var lcArr = this.lctitles.filter(x => x.selected === true).map(x => x.label);
  //   return lcArr;
  // }
  
  
  // toggleLcName(){
  //   this.islcName = this.lctitles[0].lcNameSelected ;
  //   this.islcName= !this.islcName;
  //   // alert(lc);
  // }

  // toggleStatusQuo(){
  //   this.islcStatusQuo = this.lctitles[2].statusQuoSelected ;
  //   this.islcStatusQuo= !this.islcStatusQuo;
  // }

  // toggleLcType(){
    
  //   this.islcType = this.lctitles[3].typeSelected ;
  //   this.islcType= !this.islcType;
  // }
  // toggleRole(){
  //   this.islcRole = this.lctitles[4].roleSelected ;
  //   this.islcRole= !this.islcRole;
  // }
  // toggleId(){
  //   this.islcId = this.lctitles[5].lcIdSelected ;
  //   this.islcId= !this.islcId;
  // }

  

  statusCheckboxClick(name){
    if(name == "Status")
    this.isShown = ! this.isShown;
   }

  ngOnInit() {
    // this.preferenceForm.updateSwift(this.isSwiftSelected);


    this.preferenceForm.isSwiftOpen.subscribe((res) => {
      this.isSwiftSelected = res;
    });

    this.preferenceForm.isTabDataService.subscribe((res) => {
      this.default_check = res;
    });

    
    this.preferenceForm.isisLcNameService.subscribe((res) => {
      var cc = this.lctitles.findIndex(person => person.label === 'LC Name');
    this.lctitles[cc].selected = res;
    });

    this.preferenceForm.isStatusQuoService.subscribe((res) => {
      var cc = this.lctitles.findIndex(person => person.label === 'Status Quo');
    this.lctitles[cc].selected = res;
    });
    this.preferenceForm.isisTypeService.subscribe((res) => {
      var cc = this.lctitles.findIndex(person => person.label === 'Type');
    this.lctitles[cc].selected = res;
    });
    this.preferenceForm.isLcRoleService.subscribe((res) => {
      var cc = this.lctitles.findIndex(person => person.label === 'Role');
    this.lctitles[cc].selected = res;
    });
    this.preferenceForm.isLcIdService.subscribe((res) => {
      var cc = this.lctitles.findIndex(person => person.label === 'LC ID');
    this.lctitles[cc].selected = res;
    });

    this.preferenceForm.updateLcPerPageService.subscribe((res) => {
      
    //   console.log("ngint"+res);
    //  console.log(this.lcperpages);

     if(res == 20){
      this.lcperpages[0].selected20 = true;
      this.lcperpages[1].selected60 = false;
      this.lcperpages[2].selected120 = false;
      this.lcperpages[3].selected999 = false;
     
     }

     if(res == 60){
      this.lcperpages[1].selected60 = true;
      this.lcperpages[0].selected20 = false;
      this.lcperpages[2].selected120 = false;
      this.lcperpages[3].selected999 = false;
     }

     if(res == 120){
      this.lcperpages[2].selected120 = true;
      this.lcperpages[1].selected60 = false;
      this.lcperpages[0].selected20 = false;
      this.lcperpages[3].selected999 = false;
     
     }

     if(res == 999){
      this.lcperpages[3].selected999 = true;
      this.lcperpages[2].selected120 = false;
      this.lcperpages[1].selected60 = false;
      this.lcperpages[0].selected20 = false;
     }
    }); 
  }


  defaultPreferences(){
    this.lcperpages = [
      { label20: '20', selected20: true },
      { label60: '60', selected60: false },
      { label120: '120', selected120: false },
      { label999: 'Infinite Scroll', selected999: false }
    ];
    // this.lcperpages = [
    //   { label: 20, selected: true },
    // { label: 60, selected: false },
    // { label: 120, selected: false },
    // { label: 999, selected: false }
    // ];
    this.lctitles = [
      { label: 'LC Name', selected: false },
      { label: 'LC Number', selected: false },
      { label: 'Status Quo', selected: false },
      { label: 'Type', selected: true },
      { label: 'Role', selected: true },
      { label: 'LC ID', selected: true }
    ];
    // this.lctitles = [
    //   { lcNamelabel: 'LC Name', lcNameSelected: false },
    //   { lcNumlabel: 'LC Number', lcNumSelected: false },
    //   { statusQuolabel: 'Status Quo', statusQuoSelected: false },
    //   { typelabel: 'Type', typeSelected: true },
    //   { rolelabel: 'Role', roleSelected: true },
    //   { lcIdlabel: 'LC ID', lcIdSelected: true }
    // ];
    this.dashboards = [
      { label: 'Status', selected: true },
      { label: 'Amount', selected: true },
      { label: 'Initiation Date', selected: false },
      { label: 'Role', selected: false },
      { label: 'Region', selected: false },
      { label: 'Currency of LC', selected: false },
      { label: 'Beneficiary', selected: false },
      { label: 'Expiry', selected: true },
      { label: 'Status Quo Since', selected: false },
      { label: 'SKU', selected: false },
      { label: 'Purchase Terms', selected: false },
      { label: 'Name of the Insurance', selected: false }
     ];
    this.dashfloatings = [
      { label: 'Save as Draft', selected: true },
      { label: 'Submitted to Bank (for review)', selected: true },
      { label: 'Acknowledged(accepted by bank)', selected: true },
      { label: 'Pending Authorized', selected: true },
      { label: 'Submitted to bank(for authorization)', selected: false },
      { label: 'Processed by Bank', selected: false },
      { label: 'Not Processed', selected: false },
      { label: 'Returned to GHQ for correction', selected: true },
      { label: 'Approaching Expiry', selected: false },
      { label: 'Expired', selected: false },
    ];
    this.isShown = true;
    this.isSwiftSelected = true;
    this.defaultCheckToggle();
    }

}
