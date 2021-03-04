import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';

import { ColumnSorterComponent } from './va-mat-table/actions/column-sorter/column-sorter.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SortLcData } from '../../service/sort-lc-data.pipe';
import { VaMatTableComponent } from './va-mat-table/va-mat-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule
} from '@angular/material';
import { MatSortModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule, Apollo } from 'apollo-angular';
import { LcFormService } from '../../service/lc-form.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let lcFormService: LcFormService;
  let httpClient: HttpClient;
  let apollo: Apollo;
  let httpLink: HttpLink

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        DonutChartComponent,
        SortLcData,
        VaMatTableComponent,
        ColumnSorterComponent
      ],
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatExpansionModule,
        MatAutocompleteModule,
        DragDropModule,
        MatCardModule,
        RouterTestingModule,
        HttpClientModule,
        ApolloTestingModule,
        HttpLinkModule,
        MatDialogModule,
        MatSortModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SortLcData,
        DatePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    lcFormService = new LcFormService(httpClient, apollo, httpLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT have LC before calling OnInit', () => {
    expect(component.lcFormList.length).toBe(0,
      'should not have LC before OnInit');
  });

  it('#toggleFrequentFilter() should toggle #frequentFilter', () => {
    expect(component.frequentFilter).toBe(false, 'false at first');
    component.toggleFrequentFilter();
    expect(component.frequentFilter).toBe(true, 'true after first click');
    component.toggleFrequentFilter();
    expect(component.frequentFilter).toBe(false, 'false after second click');
  });

  // it('should HAVE LC Forms after service gets them', (done: DoneFn) => {
  //   component.ngOnInit();
  //   lcFormService.getLcFormsByUserId('admin', result => {
  //     expect(result.length).toBeGreaterThan(0,
  //       'should have LC Forms after service promise resolves');
  //   });
  // });

});
