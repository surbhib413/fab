import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { AccountDetailsDialogComponent } from './account-details-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { MatFileUploadModule } from 'mat-file-upload';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';



const TEST_DIRECTIVES = [
  AccountDetailsDialogComponent
];

@NgModule({
  imports: [MatInputModule,
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
    MatDialogModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    AccountDetailsDialogComponent
  ],
})
class DialogTestModule { }

describe('AccountDetailsDialogComponent', () => {
  let component: AccountDetailsDialogComponent;
  let fixture: ComponentFixture<AccountDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [AccountDetailsDialogComponent],
      imports: [DialogTestModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
