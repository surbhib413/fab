import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { LcFormComponent } from './lc-form.component';
import { GeneralComponent } from '../general/general.component';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
import { NarrativeDetailsComponent } from '../narrative-details/narrative-details.component';
import { ReviewComponent } from '../review/review.component';
import { FooterComponent } from '../footer/footer.component';
import { AttachmentComponent } from '../attachment/attachment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentComponent } from '../comment/comment.component';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule
} from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { DatePipe } from '@angular/common';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LcFormComponent', () => {
  let component: LcFormComponent;
  let fixture: ComponentFixture<LcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LcFormComponent, GeneralComponent, PaymentDetailsComponent, BankDetailsComponent,
        ShipmentDetailsComponent, NarrativeDetailsComponent, ReviewComponent, FooterComponent, AttachmentComponent,
        CommentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatTableModule,
        MatTabsModule,
        ResizableModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatRadioModule,
        TextInputHighlightModule,
        MatProgressBarModule,
        MatIconModule,
        HttpClientModule,
        ApolloTestingModule,
        ApolloModule,
        HttpLinkModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatCardModule,
        MatListModule,
        MatPaginatorModule
      ],
      providers: [
        DatePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
