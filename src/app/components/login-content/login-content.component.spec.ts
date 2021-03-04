import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginContentComponent } from './login-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule
} from '@angular/material';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginContentComponent', () => {
  let component: LoginContentComponent;
  let fixture: ComponentFixture<LoginContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginContentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatFormFieldModule,
        MatCheckboxModule,
        HttpClientModule,
        HttpLinkModule,
        RouterTestingModule,
        MatMenuModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username validity', () => {
    let errors = {};
    let username = component.loginForm.controls['login_username'];
    expect(username.valid).toBeFalsy();

    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    username.setValue("admin");
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(username).not.toBeNull();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['login_password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should let you log in', function () {
    let username = component.loginForm.controls['login_username'];
    let password = component.loginForm.controls['login_password'];

    username.setValue('admin');
    password.setValue('admin123');
  });
});
