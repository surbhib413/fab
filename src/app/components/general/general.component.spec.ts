import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { GeneralComponent } from './general.component';
import { CommentComponent } from '../comment/comment.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule
} from '@angular/material';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralComponent, CommentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatRadioModule,
        MatMenuModule,
        MatIconModule,
        HttpClientModule,
        ApolloTestingModule,
        HttpLinkModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
    // component.lcForm = fb.group({
    // });
    component.general = fb.group({
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
    });

    component.lcForm = fb.group({
      common_info_lc_name: [''],
      common_info_system_id: [''],
      common_info_initiation_date: [''],
      common_info_lc_type: ['conventional'],
      common_info_lc_id: [Math.random().toString(36).substr(2, 9)],
      general: fb.group({
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

      payment: fb.group({
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

      bank: fb.group({
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

      shipment: fb.group({
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

      narrative: fb.group({
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

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('General form invalid when empty', () => {
    expect(component.general.valid).toBeFalsy();
  });

  it('applicant bankName field validity', () => {
    let errors = {};
    let applicant_bankName = component.general.controls['applicant_bankName'];
    errors = applicant_bankName.errors || {};

    expect(errors['required']).toBeTruthy();
    expect(applicant_bankName.value).toEqual('');

    applicant_bankName.setValue("TC Gorsch_18");
    errors = applicant_bankName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('applicant issuerReference field validity', () => {
    let errors = {};
    let applicant_issuerReference = component.general.controls['applicant_issuerReference'];
    errors = applicant_issuerReference.errors || {};

    expect(errors['required']).toBeTruthy();
    expect(applicant_issuerReference.value).toEqual('');

    applicant_issuerReference.setValue("G H Q Directorate of FIN Affairs");
    errors = applicant_issuerReference.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('applicant name field validity', () => {
    let errors = {};
    let applicant_name = component.general.controls['applicant_name'];
    errors = applicant_name.errors || {};

    expect(applicant_name.hasError('required')).toBeTruthy();
    expect(applicant_name.value).toEqual('');
    expect(applicant_name.hasError('pattern')).toBeFalsy();

    applicant_name.setValue("GHQ");
    errors = applicant_name.errors || {};
    expect(applicant_name.hasError('required')).toBeFalsy();
    expect(applicant_name.hasError('pattern')).toBeFalsy();

    applicant_name.setValue("*_GHQ");
    errors = applicant_name.errors || {};
    expect(applicant_name.hasError('required')).toBeFalsy();
    expect(applicant_name.hasError('pattern')).toBeTruthy();
  });

  it('applicant addressLine1 field validity', () => {
    let errors = {};
    let applicant_addressLine1 = component.general.controls['applicant_addressLine1'];
    errors = applicant_addressLine1.errors || {};

    expect(applicant_addressLine1.hasError('required')).toBeTruthy();
    expect(applicant_addressLine1.value).toEqual('');
    expect(applicant_addressLine1.hasError('pattern')).toBeFalsy();

    applicant_addressLine1.setValue("Al Wahdah");
    errors = applicant_addressLine1.errors || {};
    expect(applicant_addressLine1.hasError('required')).toBeFalsy();
    expect(applicant_addressLine1.hasError('pattern')).toBeFalsy();

    applicant_addressLine1.setValue("*_Al Wahdah");
    errors = applicant_addressLine1.errors || {};
    expect(applicant_addressLine1.hasError('required')).toBeFalsy();
    expect(applicant_addressLine1.hasError('pattern')).toBeTruthy();
  });

});
