import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountServiceLandingComponent } from './account-service-landing.component';
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
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AccountServiceLandingComponent', () => {
  let component: AccountServiceLandingComponent;
  let fixture: ComponentFixture<AccountServiceLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountServiceLandingComponent,
        DonutChartComponent
      ],
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatTabsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        RouterTestingModule,
        HttpClientModule,
        ApolloTestingModule,
        HttpLinkModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountServiceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
