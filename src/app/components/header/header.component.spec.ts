import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule
} from '@angular/material';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatButtonModule,
        MatMenuModule,
        HttpClientModule,
        HttpLinkModule,
        RouterTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
