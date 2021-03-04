import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ResizeEvent } from 'angular-resizable-element';
import { LcFormService } from 'src/app/service/lc-form.service';
import { AuditLogService } from 'src/app/service/audit-log.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material';
import { SharedService } from 'src/app/service/shared.service'
import { Router, ActivatedRoute } from '@angular/router';
import { PrefernceFormService } from 'src/app/service/prefernce-form.service';
import { saveAs } from 'file-saver';
import { auditTime, debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
export interface PeriodicElement {
  position: number;
  date: number;
  user: string;
  activity: string;
}

@Component({
  selector: 'app-lc-form',
  templateUrl: './lc-form.component.html',
  styleUrls: ['./lc-form.component.scss']
})
export class LcFormComponent implements OnInit {
  activeTab: number = 0;
  isExpandedVar: boolean = true;
  lcForm: FormGroup;
  showLcOptionDiv: boolean;
  showAuditLogDialogDiv: boolean;
  lc_form_id: string;
  isStepper: boolean = false;
  selectedIndex: number;
  formIds = {
    _id: '',
    uuid: '',
    version: 0
  };
  dataSource: any;
  ELEMENT_DATA = [];
  res: any;
  progress = 0;
  attachmentOpen = false;
  numOfDocsAttached = 0;
  lcComments: {};
  showComments = false;
  role: string;
  displayedColumns: string[] = ['date', 'user', 'activity'];
  newAuditLogs = []
  message: string;
  isChecker: boolean = false;
  //reviewTabStatus;

  tabNumbers = {
    0: 'general',
    1: 'payment',
    2: 'bank',
    3: 'shipment',
    4: 'narrative',
    5: 'review'
  }

  //Stepper Mapping Variables
  initiate: string = '';
  reviewer1: string = '';
  reviewer2: string = '';
  checker1: string = '';
  checker2: string = '';
  checker3: string = '';
  lcIssued: string = '';

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private lcFormService: LcFormService, private auditLogService: AuditLogService, private sharedService: SharedService, private route: ActivatedRoute, private preferenceForm: PrefernceFormService) {
    this.route.params.subscribe(params => {
      this.lc_form_id = params.uuid;
    });

    this.sharedService.selectedIndexService.subscribe(res => {
      this.selectedIndex = res;
      //this.sharedService.updateShowComment(false);
    })

    this.role = localStorage.getItem('role');
    if (this.role === "maker") {
      this.isChecker = false;
    } else {
      this.isChecker = true;
    }

  }
  isShown: boolean = true;
  showLcName: boolean = false;
  showStatusQuo: boolean = false;
  showLcType: boolean = false;
  showLcRole: boolean = false;
  showLcId: boolean = false;
  updateDb: boolean = false;
  ngOnInit() {

    this.lcFormService.updateServiceFormId(JSON.stringify({ _id: '', uuid: '', version: 0 }));
    this.sharedService.updateSelectedIndex(0);

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

    this.lcFormService.getBankType((res) => {
      //console.log("Get Bank Type",res);
    });

    this.lcFormService.getBeneficiaryName((res) => {
      //console.log("Get Beneficiary Name",res);
    })

    this.lcFormService.getBankDraweeDetails((res) => {
      //console.log("Get Drawee Details",res);
    })

    // this.sharedService.showCommentService.subscribe(res => {
    //   this.showComments= res;
    // })

    this.sharedService.isExpandedVarservice.subscribe(res => {
      this.isExpandedVar = res;
    });
    this.lcFormService.serviceFormIds.subscribe(res => {
      this.formIds = JSON.parse(res)
    })

    //Form initialization
    this.lcForm = this.fb.group({
      common_info_lc_name: [''],
      common_info_system_id: [''],
      common_info_initiation_date: [''],
      common_info_lc_type: ['conventional'],
      common_info_lc_id: [Math.random().toString(36).substr(2, 9)],
      general: this.fb.group({
        applicant_bankName: ['', Validators.required],
        applicant_issuerReference: ['', Validators.required],
        applicant_name: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        applicant_addressLine1: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        applicant_addressLine2: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        applicant_addressLine3: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        applicant_country: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        applicant_customerReference: [''],
        applicant_contractNumber: [''],
        beneficiary_name: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        beneficiary_addressLine1: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        beneficiary_addressLine2: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        beneficiary_addressLine3: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        beneficiary_country: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-\\s]*$")]],
        lc_form: [''],
        lc_form_standBy: [''],
        lc_expiryDate: ['', Validators.required],
        lc_placeOfExpiry: ['', Validators.required],
        lc_confirmationInstructions: [''],
        lc_rulesApplicable: [''],
        lc_sendLcBy: ['', [Validators.required]],
        lc_principleAccount: [''],
        lc_feeAccount: [''],
        lc_otherInfo: [''],
        valid: [false],
        visited: [false]
      }),

      payment: this.fb.group({
        amount_lcAmount: [0, [Validators.required, Validators.pattern("[0-9]*$")]],
        amount_variantPlus: [''],
        amount_variantMinus: [''],
        amount_currency: ['', Validators.required],
        amount_issuingBankCharges: [''],
        amount_outsideCountryCharges: [''],
        amount_legalizationCharges: [''],
        amount_confirmationCharges: [''],
        amount_paymentCondition: [''],
        amount_country: ['', Validators.required],
        valid: [false],
        visited: [false]
      }),

      bank: this.fb.group({
        advisingbankName: [''],
        advisingaddress: [''],
        advisingbic_code: [''],
        adviseThru_bankName: [''],
        adviseThru_address: [''],
        adviseThru_bic_code: [''],
        requestedConfirmationParty: [''],
        creditAvailable_type: ['', Validators.required],
        creditAvailable_name: ['', Validators.required],
        creditAvailable_addressLine1: ['', Validators.required],
        creditAvailable_addressLine2: ['', Validators.required],
        creditAvailable_addressLine3: ['', Validators.required],
        creditAvailable_creditAvailableBy: [''],
        creditAvailable_paymentDraftAt: [''],
        creditAvailable_draweeDetails: ['', Validators.required],
        valid: [false],
        visited: [false]
      }),

      shipment: this.fb.group({
        generalInfo_shipmentFrom: [''],
        generalInfo_placeOfLoading: [''],
        generalInfo_placeOfDischarge: [''],
        generalInfo_shipmentTo: [''],
        generalInfo_partialShipment: [''],
        generalInfo_transhipment: [''],
        generalInfo_latestShipmentDate: [''],
        generalInfo_purchaseTerms: [''],
        generalInfo_namedPlace: ['', Validators.required],
        generalInfo_nameOfInsuranceCompany: ['', Validators.required],
        generalInfo_policynumber: ['', Validators.required],
        shipmentPeriod: [''],
        additionalAmount: [''],
        period_noOfDays: [''],
        period_narrative: [''],
        valid: [false],
        visited: [false]
      }),

      narrative: this.fb.group({
        descriptionOfGoods: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-=!%&*<>;{@#_\\s\\x22]*$")]],
        documentRequired: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9/?:().,'+-=!%&*<>;{@#_\\s\\x22]*$")]],
        additionalInstructions: ['', [Validators.pattern("[a-zA-Z0-9/?:().,'+-=!%&*<>;{@#_\\s\\x22]*$")]],
        special_paymentCondition: ['', [Validators.pattern("[a-zA-Z0-9/?:().,'+-=!%&*<>;{@#_\\s\\x22]*$")]],
        valid: [false],
        visited: [false]
      }),
      attached_documents: [[]],
      status: [''],
      createdAt: [''],
      updatedAt: [''],
      valid: [false],
      visited: [false]
    });

    this.lcForm.valueChanges.pipe(debounceTime(2000)).subscribe(formData => {
      if (this.updateDb && this.role === 'maker') {
        this.saveLcForm();
      }
      else {
        this.updateDb = true;
      }
    });

    //when Lc is loaded, by default general tab will be visited
    //this.lcForm.get('general').value.visited = true;
    //console.log(this.lcForm.get('general').value.visited);

    //getLcForm Details if form id is present
    if (this.lc_form_id) {
      this.getLcFormDetails();
    }

    this.generateEmptyComments();
    this.sharedService.updateLcComment(this.lcComments);

    this.sharedService.termsCheckedService.subscribe(res => {
      if (res && this.lcForm) {
        if (this.lcForm.valid) this.lcForm.value.valid = true;
        //this.reviewTabStatus = 'green';
        //console.log("when terms checked",this.lcForm);

      }
      else {
        //this.reviewTabStatus = 'yellow';
        this.lcForm.value.valid = false;
        this.lcForm.value.visited = true;
      }
    });

  }

  receiveAuditLog($event) {
    let changes = JSON.parse($event)
    // console.log(changes)
    let newLog = {
      uuid: this.lc_form_id,
      date: Date.now(),
      user: 'Ahmed',
      activity: 'Changed ' + changes.field + ' to ' + changes.curr
    }
    //console.log(newLog)
    this.ELEMENT_DATA.push(newLog)
    this.newAuditLogs.push(newLog)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
    console.log(this.ELEMENT_DATA)
  }

  sendAuditLogs($event) {
    console.log('sending audit log', this.newAuditLogs)
    let auditLogs = []
    if (this.newAuditLogs.length) {
      auditLogs = this.newAuditLogs.map(element => {
        if (!element["uuid"]) {
          element.uuid = this.formIds.uuid
        }
        return element
      })
      console.log(auditLogs)
      this.auditLogService.sendAuditLogs(auditLogs)
        .subscribe(res => {
          console.log('audit logs saved')
          this.newAuditLogs = []
        }, err => {
          console.log(err)
        })
    }
  }



  // get audit logs
  getAuditLog() {
    return this.auditLogService.getAuditLogs((res) => {
      this.ELEMENT_DATA = res.map(auditLog => ({
        date: auditLog.date,
        user: auditLog.user,
        activity: auditLog.activity
      }))
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }, this.lc_form_id);
  }

  showStepper() {
    this.isStepper = !this.isStepper;
  }

  saveLcForm() {
    // this.lcForm.patchValue({
    //   status : 'save_as_draft'
    // });
    // var status = 'save_as_draft';
    // if(this.formIds.uuid){ //uuid is present in form
    //   this.lcFormService.saveLcForm(status,this.lcForm.value, this.formIds,(allData, err) =>{
    //     if(allData['data']['updateLcForm']){
    //       let response = allData['data']['updateLcForm'];
    //       console.log("Updated");
    //     }else{
    //       console.log(allData)
    //     }
    //     if(err){
    //       console.log('error', err)
    //     }
    //   })
    // }
    // else{ // first time submit lc form on click of save button
    //   this.lcFormService.submitLcForm(status,this.lcForm.value, this.formIds,(allData, err) => {
    //     if(allData['data']['createLcForm']){
    //       let response = allData['data']['createLcForm'];
    //       // update form ids
    //       this.formIds._id = response._id 
    //       this.formIds.uuid = response.uuid
    //       this.formIds.version = response.version
    //       console.log("Saved");
    //     }else{
    //       console.log(allData)
    //     }
    //     if(err){
    //       console.log('error', err)
    //     }
    //   })
    // }
    console.log('auto save called', this.formIds)
    this.lcFormService.saveLcForm(this.lcForm.value, this.formIds, (allData, err) => {
      if (allData['data']['updateLcForm']) {
        let response = allData['data']['updateLcForm'];
        this.formIds._id = response._id
        this.formIds.uuid = response.uuid
        this.formIds.version = response.version
        this.sharedService.patchLcForm(response);
        this.updateServiceFormId()
        this.sendAuditLogs('')
        console.log("lc form updated", response);
      } else {
        console.log("form not updated", allData)
      }
      if (err) {
        console.log('error', err)
      }

    })
  }

  // sent form id to footer via service
  updateServiceFormId() {
    this.lcFormService.updateServiceFormId(JSON.stringify(this.formIds))
  }

  switchTab(tabNum: any) {
    //this.selectedIndex = tabNum;
    this.sharedService.updateSelectedIndex(tabNum);
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {

    //this.selectedIndex = tabChangeEvent.index;
    if (this.role == 'maker') {
      this.saveLcForm();
    }

    console.log("form----", this.lcForm);
    this.sharedService.updateSelectedIndex(tabChangeEvent.index);

    let visitedTab = tabChangeEvent.index - tabChangeEvent.tab.origin;

    if (this.selectedIndex == 5) {
      //this.reviewTabStatus = 'yellow';
      this.lcForm.value.visited = true;
      this.sharedService.updateTermsChecked(false);
      this.lcForm.value.visited = true;
    }
    else {
      this.lcForm.get(this.tabNumbers[this.selectedIndex]).value.visited = true;
    }

    this.activeTab = this.selectedIndex;

    if (visitedTab != 5) {
      this.lcForm.get(this.tabNumbers[visitedTab]).value.visited = true;
      if (this.lcForm.get(this.tabNumbers[visitedTab]).valid) {
        this.lcForm.get(this.tabNumbers[visitedTab]).value.valid = true;
      }
      else {
        this.lcForm.get(this.tabNumbers[visitedTab]).value.valid = false;
      }
    }
    else {
      this.lcForm.value.visited = true;
    }


    // switch (visitedTab) {
    //   case 0:
    //     this.lcForm.get('general').value.visited = true;
    //     if(this.lcForm.get('general').valid){
    //       this.lcForm.get('general').value.valid = true;
    //     }
    //     else{
    //       this.lcForm.get('general').value.valid = false;
    //     }
    //     break;
    //   case 1:
    //     this.lcForm.get('payment').value.visited = true;
    //     if(this.lcForm.get('payment').valid){
    //       this.lcForm.get('payment').value.valid = true;
    //     }
    //     else{
    //       this.lcForm.get('payment').value.valid = false;
    //     }
    //     break;
    //   case 2:
    //     this.lcForm.get('bank').value.visited = true;
    //     if(this.lcForm.get('bank').valid){
    //       this.lcForm.get('bank').value.valid = true;
    //     }
    //     else{
    //       this.lcForm.get('bank').value.valid = false;
    //     }
    //     break;
    //   case 3:
    //     this.lcForm.get('shipment').value.visited = true;
    //     if(this.lcForm.get('shipment').valid){
    //       this.lcForm.get('shipment').value.valid = true;
    //     }
    //     else{
    //       this.lcForm.get('shipment').value.valid = false;
    //     }
    //   break;
    //   case 4:
    //     this.lcForm.get('narrative').value.visited = true;
    //     if(this.lcForm.get('narrative').valid){
    //       this.lcForm.get('narrative').value.valid = true;
    //     }
    //     else{
    //       this.lcForm.get('narrative').value.valid = false;
    //     }
    //   break;
    //   default:
    //     break;
    // }

  }

  downloadSwiftFile() {
    this.lcFormService.getSwiftFile(this.res.uuid).subscribe(
      data => {
        saveAs(data, `swift.txt`)
      },
      err => {
        console.error(err);
      }
    );
  }

  uploadFile(fileList) {
    if (fileList.length === 0) {
      console.log("no files");
    }
    else {
      var docs = this.lcForm.value.attached_documents;
      const formData: any = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        //attached_documents[files[i]['name']] = uuid+"_"+files[i]['name'];
        docs.push({ file_name: fileList[i]['name'], file_path: this.formIds.uuid + "_" + fileList[i]['name'] });
        formData.append("uploads[]", fileList[i], this.formIds.uuid + "_" + fileList[i]['name']);
      }
      formData.append('attached_documents', JSON.stringify(docs));
      formData.append('_id', this.formIds._id);
      // this.lcFormService.uploadFile(fileList, this.res.uuid, this.lcForm.value.attached_documents, this.res._id).subscribe(data => {
      this.lcFormService.uploadFile(formData).subscribe(data => {
        if (data.type == 1 && data.loaded && data.total) {
          this.progress = Math.round(100 * data.loaded / data.total);
        }
        if (this.lcForm.value.attached_documents)
          this.numOfDocsAttached = docs.length;
        this.lcForm.patchValue({
          attached_documents: docs
        });
        this.updateDb = false;
      }, error => {
        console.log(error);
      });
    }
  }

  deleteFile(fileList) {
    var docs = [];
    Object.keys(fileList).forEach(key => {
      docs.push({ file_name: key, file_path: this.res.uuid + "_" + key })
    })
    var data = {
      _id: this.res._id,
      attached_documents: docs
    }
    this.lcFormService.deleteFile(data).subscribe(data => {
      this.lcForm.patchValue({
        attached_documents: docs
      })
      this.updateDb = false;
      if (this.lcForm.value.attached_documents)
        this.numOfDocsAttached = docs.length;

    }, error => {
      console.log(error);
    });
  }

  getNumOfAttachments() {
    if (this.lcForm.value.attached_documents) {
      return Object.keys(this.lcForm.value.attached_documents).length;
    }
    else {
      return 0;
    }

  }

  openAttachment() {
    this.attachmentOpen = true;
  }

  closeAttachment() {
    this.attachmentOpen = false;
  }

  // fetch form detail
  getLcFormDetails() {
    this.lcFormService.getLcFormDetails(this.lc_form_id).subscribe(
      response => {
        this.res = JSON.parse(JSON.stringify(response)).data[0];
        this.getStepperState();
        console.log("LC Details response", this.res);
        this.formIds = {
          _id: this.res._id,
          uuid: this.res.uuid,
          version: this.res.version
        }
        // if(this.res.status != "save_as_draft" || this.isChecker){
        //   this.getLcFormComment();
        // }
        this.getLcFormComment();
        this.getAuditLog();
        this.updateServiceFormId();
        //this.setReviewTabStatus();
        this.lcForm.patchValue({
          common_info_lc_name: this.res.common_info.lc_name,
          common_info_system_id: this.res.common_info.system_id,
          common_info_initiation_date: this.res.common_info.initiation_date,
          common_info_lc_type: this.res.common_info.lc_type,
          common_info_lc_id: this.res.common_info.lc_id,
          general: {
            applicant_bankName: this.res.general_info.applicant_detail.bank_name,
            applicant_issuerReference: this.res.general_info.applicant_detail.issuer_reference,
            applicant_name: this.res.general_info.applicant_detail.name,
            applicant_addressLine1: this.res.general_info.applicant_detail.address_line1,
            applicant_addressLine2: this.res.general_info.applicant_detail.address_line2,
            applicant_addressLine3: this.res.general_info.applicant_detail.address_line3,
            applicant_country: this.res.general_info.applicant_detail.country,
            applicant_customerReference: this.res.general_info.applicant_detail.customer_reference,
            applicant_contractNumber: this.res.general_info.applicant_detail.contract_number,
            beneficiary_name: this.res.general_info.beneficiary_detail.name,
            beneficiary_addressLine1: this.res.general_info.beneficiary_detail.address_line1,
            beneficiary_addressLine2: this.res.general_info.beneficiary_detail.address_line2,
            beneficiary_addressLine3: this.res.general_info.beneficiary_detail.address_line3,
            beneficiary_country: this.res.general_info.beneficiary_detail.country,
            lc_form: this.res.general_info.lc_detail.form_of_lc,
            lc_form_standBy: this.res.general_info.lc_detail.form_of_lc_standby,
            lc_expiryDate: this.res.general_info.lc_detail.expiry_date,
            lc_placeOfExpiry: this.res.general_info.beneficiary_detail.country,
            lc_confirmationInstructions: this.res.general_info.lc_detail.confirmation_instructions,
            lc_rulesApplicable: this.res.general_info.lc_detail.rules_applicable,
            lc_sendLcBy: this.res.general_info.lc_detail.send_lc_by,
            lc_principleAccount: this.res.general_info.lc_detail.principal_account,
            lc_feeAccount: this.res.general_info.lc_detail.fee_account,
            lc_otherInfo: this.res.general_info.lc_detail.other_info,
            valid: this.res.general_info.valid,
            visited: this.res.general_info.visited
          },

          payment: {
            amount_lcAmount: this.res.payment_detail.amount_charges.lc_amount,
            amount_variantPlus: this.res.payment_detail.amount_charges.variant_plus,
            amount_variantMinus: this.res.payment_detail.amount_charges.variant_minus,
            amount_currency: this.res.payment_detail.amount_charges.currency,
            amount_issuingBankCharges: this.res.payment_detail.amount_charges.issuing_bank_charges,
            amount_outsideCountryCharges: this.res.payment_detail.amount_charges.outside_country_charges,
            amount_legalizationCharges: this.res.payment_detail.amount_charges.legalization_charges,
            amount_confirmationCharges: this.res.payment_detail.amount_charges.confirmation_charges,
            amount_paymentCondition: this.res.payment_detail.amount_charges.payment_condition_for_beneficiary,
            amount_country: this.res.payment_detail.country,
            valid: this.res.payment_detail.valid,
            visited: this.res.payment_detail.visited
          },

          bank: {
            advisingbankName: this.res.bank_other_party_detail.advising_bank.bank_name,
            advisingaddress: this.res.bank_other_party_detail.advising_bank.address,
            advisingbic_code: this.res.bank_other_party_detail.advising_bank.bic_code,
            adviseThru_bankName: this.res.bank_other_party_detail.advise_thru_bank.bank_name,
            adviseThru_address: this.res.bank_other_party_detail.advise_thru_bank.address,
            adviseThru_bic_code: this.res.bank_other_party_detail.advise_thru_bank.bic_code,
            requestedConfirmationParty: this.res.bank_other_party_detail.requested_confirmation_party,
            creditAvailable_type: this.res.bank_other_party_detail.credit_available.type,
            creditAvailable_name: this.res.bank_other_party_detail.credit_available.name,
            creditAvailable_addressLine1: this.res.bank_other_party_detail.credit_available.addressLine1,
            creditAvailable_addressLine2: this.res.bank_other_party_detail.credit_available.addressLine2,
            creditAvailable_addressLine3: this.res.bank_other_party_detail.credit_available.addressLine3,
            creditAvailable_creditAvailableBy: this.res.bank_other_party_detail.credit_available.credit_available_by,
            creditAvailable_paymentDraftAt: this.res.bank_other_party_detail.credit_available.payment_draft_at,
            creditAvailable_draweeDetails: this.res.bank_other_party_detail.credit_available.drawee_detail,
            valid: this.res.bank_other_party_detail.valid,
            visited: this.res.bank_other_party_detail.visited
          },

          shipment: {
            generalInfo_shipmentFrom: this.res.shipment_detail.general_info.shipment_from,
            generalInfo_placeOfLoading: this.res.shipment_detail.general_info.place_of_loading,
            generalInfo_placeOfDischarge: this.res.shipment_detail.general_info.place_of_discharge,
            generalInfo_shipmentTo: this.res.shipment_detail.general_info.shipment_to,
            generalInfo_partialShipment: this.res.shipment_detail.general_info.partial_shipment,
            generalInfo_transhipment: this.res.shipment_detail.general_info.transhipment,
            generalInfo_latestShipmentDate: this.res.shipment_detail.general_info.latest_shipment_date,
            generalInfo_purchaseTerms: this.res.shipment_detail.general_info.purchase_terms,
            generalInfo_namedPlace: this.res.shipment_detail.general_info.named_place,
            generalInfo_nameOfInsuranceCompany: this.res.shipment_detail.general_info.insurance_company_name,
            generalInfo_policynumber: this.res.shipment_detail.general_info.policy_number,
            shipmentPeriod: this.res.shipment_detail.shipment_period,
            additionalAmount: this.res.shipment_detail.additional_amount,
            period_noOfDays: this.res.shipment_detail.period_for_presentation.no_of_days,
            period_narrative: this.res.shipment_detail.period_for_presentation.narrative,
            valid: this.res.shipment_detail.valid,
            visited: this.res.shipment_detail.visited
          },

          narrative: {
            descriptionOfGoods: this.res.narrative_detail.description_of_goods,
            documentRequired: this.res.narrative_detail.documents_required,
            additionalInstructions: this.res.narrative_detail.additional_instructions,
            special_paymentCondition: this.res.narrative_detail.special_payment_condition,
            valid: this.res.narrative_detail.valid,
            visited: this.res.narrative_detail.visited
          },
          attached_documents: this.res.attached_documents || [],
          status: this.res.status,
          createdAt: this.datePipe.transform(this.res.createdAt, "dd-MM-yyyy"),
          updatedAt: this.datePipe.transform(this.res.updatedAt, "dd-MM-yyyy"),
          valid: this.res.valid,
          visited: this.res.visited
        });
        console.log("this.lc form", this.lcForm.value);
        this.sharedService.patchLcForm(this.res);
        //this.numOfDocsAttached = Object.keys(this.res.attached_documents).length;
        //console.log("docs",this.lcForm.value.attached_documents);
        this.numOfDocsAttached = this.lcForm.value.attached_documents.length;
      },
      err => {
        console.log("Error occured in getLcFormDetails" + err);
      }
    );
  }

  // setReviewTabStatus(){
  //   if(this.res.status === "save_as_draft"){
  //     this.reviewTabStatus = "blank";
  //   }
  //   else if(!this.lcForm.valid && this.lcForm.get('general').value.visited && this.lcForm.get('payment').value.visited && this.lcForm.get('bank').value.visited && this.lcForm.get('shipment').value.visited && this.lcForm.get('narrative').value.visited){
  //     this.reviewTabStatus = 'yellow';
  //   }
  //   else if(this.lcForm.valid && this.res.status != "save_as_draft"){
  //     this.reviewTabStatus = 'green';
  //     //check the terms checkbox
  //     //this.sharedService.updateTermsChecked(true);
  //   }

  // }

  getLcFormComment() {
    this.lcFormService.getLcFormComment((response, err) => {
      //console.log("got response from backnd comments",response);
      if (response) {
        this.generatelcComments(response);
        this.sharedService.updateLcComment(this.lcComments);
      }
      else {
        this.generateEmptyComments();
        this.sharedService.updateLcComment(this.lcComments);
      }
      if (err)
        console.log(err);
    }, this.res.uuid);
  }

  getTabCommentsCount(tabName: string) {
    switch (tabName) {
      case 'general':
        return (this.lcComments['general_applicant_issuerReference'] ? this.lcComments['general_applicant_issuerReference'].comments.length : 0) + (this.lcComments['general_applicant_bankName'] ? this.lcComments['general_applicant_bankName'].comments.length : 0);
        break;
      case 'payment':
        return (this.lcComments['payment_amount_lcAmount'] ? this.lcComments['payment_amount_lcAmount'].comments.length : 0) + (this.lcComments['payment_amount_currency'] ? this.lcComments['payment_amount_currency'].comments.length : 0);
        break;
      case 'bank':
        return (this.lcComments['bank_creditAvailable_type'] ? this.lcComments['bank_creditAvailable_type'].comments.length : 0) + (this.lcComments['bank_creditAvailable_draweeDetails'] ? this.lcComments['bank_creditAvailable_draweeDetails'].comments.length : 0);
        break;
      case 'shipment':
        return (this.lcComments['shipment_generalInfo_namedPlace'] ? this.lcComments['shipment_generalInfo_namedPlace'].comments.length : 0) + (this.lcComments['shipment_generalInfo_nameOfInsuranceCompany'] ? this.lcComments['shipment_generalInfo_nameOfInsuranceCompany'].comments.length : 0);
        break;
      case 'narrative':
        return (this.lcComments['narrative_descriptionOfGoods'] ? this.lcComments['narrative_descriptionOfGoods'].comments.length : 0) + (this.lcComments['narrative_documentRequired'] ? this.lcComments['narrative_documentRequired'].comments.length : 0);
        break;
      default:
        return 0;
        break;
    }
  }

  showLcOption() {
    this.showLcOptionDiv = true;
  }

  showAuditLogDialog() {
    this.showAuditLogDialogDiv = true;
    this.showLcOptionDiv = false;
  }

  closeAuditLogDialog() {
    this.showAuditLogDialogDiv = false;
  }

  onResizeEnd(event: ResizeEvent): void {
    // console.log('Element was resized', event);
  }

  generatelcComments(data) {
    this.lcComments = {
      general_applicant_bankName: data.general_info ? data.general_info.applicant_detail.bank_name : { comments: [], updated: false },
      general_applicant_issuerReference: data.general_info ? data.general_info.applicant_detail.issuer_reference : { comments: [], updated: false },

      payment_amount_lcAmount: data.payment_detail ? data.payment_detail.amount_charges.lc_amount : { comments: [], updated: false },
      payment_amount_currency: data.payment_detail ? data.payment_detail.amount_charges.currency : { comments: [], updated: false },

      //bank_creditAvailable_type: data.bank_other_party_detail ? data.bank_other_party_detail.credit_available.type : {comments:[],updated:false},
      //bank_creditAvailable_draweeDetails: data.bank_other_party_detail ? data.bank_other_party_detail.credit_available.drawee_detail : {comments:[],updated:false},

      bank_creditAvailable_type: data.bank_other_party_detail ? (data.bank_other_party_detail.credit_available ? data.bank_other_party_detail.credit_available.type : { comments: [], updated: false }) : { comments: [], updated: false },
      bank_creditAvailable_draweeDetails: data.bank_other_party_detail ? (data.bank_other_party_detail.credit_available ? data.bank_other_party_detail.credit_available.drawee_detail : { comments: [], updated: false }) : { comments: [], updated: false },

      shipment_generalInfo_namedPlace: data.shipment_detail ? data.shipment_detail.general_info.named_place : { comments: [], updated: false },
      shipment_generalInfo_nameOfInsuranceCompany: data.shipment_detail ? data.shipment_detail.general_info.insurance_company_name : { comments: [], updated: false },

      narrative_descriptionOfGoods: data.narrative_detail ? data.narrative_detail.description_of_goods : { comments: [], updated: false },
      narrative_documentRequired: data.narrative_detail ? data.narrative_detail.documents_required : { comments: [], updated: false }
    }

  }

  generateEmptyComments() {
    this.lcComments = {
      general_applicant_bankName: { comments: [], updated: false },
      general_applicant_issuerReference: { comments: [], updated: false },
      payment_amount_lcAmount: { comments: [], updated: false },
      payment_amount_currency: { comments: [], updated: false },
      bank_creditAvailable_type: { comments: [], updated: false },
      bank_creditAvailable_draweeDetails: { comments: [], updated: false },
      shipment_generalInfo_namedPlace: { comments: [], updated: false },
      shipment_generalInfo_nameOfInsuranceCompany: { comments: [], updated: false },
      narrative_descriptionOfGoods: { comments: [], updated: false },
      narrative_documentRequired: { comments: [], updated: false }
    }
  }

  getStepperState() {

    console.log("STATUS: ", this.res.status);

    if ((this.res.status == 'save_as_draft') || (this.res.status == 'returned_to_ghq_for_correction') || (this.res.status == 'not_processed') || (this.res.status == 'expired') || (this.res.status) == 'approaching_expiry') {
      this.initiate = 'active';
    }
    if ((this.res.status == 'submitted_to_bank_for_review') || (this.res.status == 'acknowledged') || (this.res.status == 'pending_authorized')) {
      this.initiate = 'completed';
      this.reviewer1 = 'completed';
      this.reviewer2 = 'completed';
      this.checker1 = 'completed';
      this.checker2 = 'completed';
      this.checker3 = 'active';
    }
    if ((this.res.status == 'submitted_to_bank_for_authorization') || (this.res.status == 'processed_by_bank')) {
      this.initiate = 'completed';
      this.reviewer1 = 'completed';
      this.reviewer2 = 'completed';
      this.checker1 = 'completed';
      this.checker2 = 'completed';
      this.checker3 = 'completed';
      this.lcIssued = 'active';
    }
  }

}
