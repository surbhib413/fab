import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApolloModule, Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AppComponent } from "./app.component";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GeneralComponent } from "./components/general/general.component";
import { PaymentDetailsComponent } from "./components/payment-details/payment-details.component";
import { BankDetailsComponent } from "./components/bank-details/bank-details.component";
import { ShipmentDetailsComponent } from "./components/shipment-details/shipment-details.component";
import { NarrativeDetailsComponent } from "./components/narrative-details/narrative-details.component";
import { LcFormComponent } from "./components/lc-form/lc-form.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MatExpansionModule } from "@angular/material/expansion";
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatTableModule,
  MatSlideToggleModule,
  MatCardModule,
  MatPaginatorModule
} from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TextInputHighlightModule } from "angular-text-input-highlight";
import { MatSortModule } from "@angular/material";
import { NavComponent } from "./nav/nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { ResizableModule } from "angular-resizable-element";
import { MatFileUploadModule } from "mat-file-upload";
//import { MatFileUploadModule } from 'angular-material-fileupload';
import { LoginComponent } from "./components/login/login.component";
import { LoginHeaderComponent } from "./components/login-header/login-header.component";
import { LoginContentComponent } from "./components/login-content/login-content.component";
import { LoginFooterComponent } from "./components/login-footer/login-footer.component";
import { ReviewComponent } from "./components/review/review.component";
import { LCDialogComponent } from "./components/lc-dialog/lc-dialog.component";
import { LandingComponent } from "./components/landing/landing.component";
import { InMemoryCache } from "apollo-cache-inmemory";
import { DragDirective } from "./directives/dragDrop.directive";
import { AttachmentComponent } from "./components/attachment/attachment.component";
import { CreateLcDialogComponent } from "./components/create-lc-dialog/create-lc-dialog.component";
import { PreferenceDialogComponent } from "./components/preference-dialog/preference-dialog.component";
import { CommentComponent } from "./components/comment/comment.component";
import { SortLcData } from "./service/sort-lc-data.pipe";
import { WipComponent } from "./wip/wip.component";
import { AdvancedDialogComponent } from "./components/advanced-dialog/advanced-dialog.component";

import { ReturnDialogComponent } from "./components/return-dialog/return-dialog.component";
import { AuthorizeDialogComponent } from "./components/authorize-dialog/authorize-dialog.component";

import { AccountServiceLandingComponent } from "./components/account-service-landing/account-service-landing.component";
import { AccountDetailsComponent } from "./components/account-details/account-details.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { AccountDetailsDialogComponent } from "./components/account-details-dialog/account-details-dialog.component";
import { TrendCurrencyDialogComponent } from "./components/trend-currency-dialog/trend-currency-dialog.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { AccountListComponent } from "./components/account-list/account-list.component";
import { TrendForecastComponent } from "./components/trend-forecast/trend-forecast.component";
import { ReportComponent } from "./components/report/report.component";
import { AccountComponent } from "./components/account/account.component";
import { TransactionListComponent } from "./components/transaction-list/transaction-list.component";
import { DonutChartComponent } from "./components/donut-chart/donut-chart.component";
import { TableComponent } from "./components/table/table.component";
import { AccountsInformationComponent } from "./components/accounts-information/accounts-information.component";
import { PreConfiguredChartsComponent } from "./components/pre-configured-charts/pre-configured-charts.component";
import { ReportDialogComponent } from "./report-dialog/report-dialog.component";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { DatePipe } from "@angular/common";
import { HorizontalBarChartComponent } from "./components/horizontal-bar-chart/horizontal-bar-chart.component";
import { TrendForecastGraphComponent } from "./components/trend-forecast-graph/trend-forecast-graph.component";
import { VaMatTableComponent } from "./components/landing/va-mat-table/va-mat-table.component";
import { ColumnSorterComponent } from "./components/landing/va-mat-table/actions/column-sorter/column-sorter.component";
import { SessionDialogComponent } from "./components/session-dialog/session-dialog.component";
import { AccountsFilterDialogComponent } from "./components/accounts-filter-dialog/accounts-filter-dialog.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { MultiLineChartComponent } from "./components/multi-line-chart/multi-line-chart.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { MultiLineGraphComponent } from "./components/multi-line-graph/multi-line-graph.component";
import { DoughnutChartComponent } from "./components/doughnut-chart/doughnut-chart.component";
import { ChartFilterModalComponent } from "./components/chart-filter-modal/chart-filter-modal.component";
import { StackedHoriBarChartComponent } from "./components/stacked-hori-bar-chart/stacked-hori-bar-chart.component";
import { AccountServiceOverviewComponent } from "./components/account-service-overview/account-service-overview.component";
import { AccountListFilterModalComponent } from './components/account-list-filter-modal/account-list-filter-modal.component';
import { SortAccountData } from './service/sort-account-data.pipe';
import { AccountServicesAdvancedFiltersComponent } from './account-services-advanced-filters/account-services-advanced-filters.component';
import { LineBubbleGraphComponent } from './components/line-bubble-graph/line-bubble-graph.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { MirrorChartComponent } from './components/mirror-chart/mirror-chart.component';
import { MultiLineComponent } from './components/multi-line/multi-line.component';
// import {TrendForecastGraphComponent} from './components/trend-forecast-graph/trend-forecast-graph.component';

// import { JwtAuthService } from './guards/jwt-auth.service';
// import { ErrorInterceptorService } from './gcduards/error-interceptor.service';

// import { JwtAuthService } from './guards/jwt-auth.service';
// import { ErrorInterceptorService } from './guards/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GeneralComponent,
    PaymentDetailsComponent,
    BankDetailsComponent,
    ShipmentDetailsComponent,
    NarrativeDetailsComponent,
    LcFormComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AppComponent,
    LoginComponent,
    LoginHeaderComponent,
    LoginContentComponent,
    LoginFooterComponent,
    ReviewComponent,
    LCDialogComponent,
    LandingComponent,
    DragDirective,
    AttachmentComponent,
    CreateLcDialogComponent,
    PreferenceDialogComponent,
    CommentComponent,
    SortLcData,
    WipComponent,
    AccountDetailsComponent,
    AdvancedDialogComponent,
    BarChartComponent,
    ReturnDialogComponent,
    AuthorizeDialogComponent,
    AccountDetailsDialogComponent,
    TrendCurrencyDialogComponent,
    AccountServiceLandingComponent,
    TransactionsComponent,
    OverviewComponent,
    AccountListComponent,
    TrendForecastComponent,
    ReportComponent,
    AccountComponent,
    TransactionListComponent,
    DonutChartComponent,
    TableComponent,
    AccountsInformationComponent,
    PreConfiguredChartsComponent,
    ReportDialogComponent,
    HorizontalBarChartComponent,
    TrendForecastGraphComponent,
    ColumnSorterComponent,
    VaMatTableComponent,
    SessionDialogComponent,
    AccountsFilterDialogComponent,
    NotificationComponent,
    MultiLineChartComponent,
    LineChartComponent,
    MultiLineGraphComponent,
    DoughnutChartComponent,
    ChartFilterModalComponent,
    StackedHoriBarChartComponent,
    AccountServiceOverviewComponent,
    AccountListFilterModalComponent,
    SortAccountData,
    LineBubbleGraphComponent,
    HeatMapComponent,
    MirrorChartComponent,
    AccountServicesAdvancedFiltersComponent,
    MultiLineComponent,
    // LineBubbleGraphComponent
    // TrendForecastGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFileUploadModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    DragDropModule,
    ResizableModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    ApolloModule,
    HttpLinkModule,
    MatProgressBarModule,
    MatPaginatorModule,
    TextInputHighlightModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [
    MatDatepickerModule,
    ApolloModule,
    Apollo,
    HttpLinkModule,
    HttpLink,
    HttpClient,
    HttpClientModule,
    ReportDialogComponent,
    DatePipe,
    SortLcData,
    SortAccountData,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          // cache: new InMemoryCache(),
          cache: new InMemoryCache({
            addTypename: false
          }),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: "no-cache",
              errorPolicy: "ignore"
            },
            query: {
              fetchPolicy: "no-cache",
              errorPolicy: "all"
            }
          },
          link: httpLink.create({})
        };
      },
      deps: [HttpLink]
    }
    // { provide: HTTP_INTERCEPTORS, useClass: JwtAuthService , multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  entryComponents: [
    LCDialogComponent,
    CreateLcDialogComponent,
    PreferenceDialogComponent,
    AdvancedDialogComponent,
    ReturnDialogComponent,
    AuthorizeDialogComponent,
    AccountDetailsDialogComponent,
    TrendCurrencyDialogComponent,
    ReportDialogComponent,
    SessionDialogComponent,
    AccountsFilterDialogComponent,
    NotificationComponent,
    AccountServicesAdvancedFiltersComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
