import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginContentComponent } from '../login-content/login-content.component';
import { LoginHeaderComponent } from '../login-header/login-header.component';
import { LoginFooterComponent } from '../login-footer/login-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatTabsModule, MatAutocompleteModule, MatMenuModule,
  MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatTableModule,
  MatSlideToggleModule, MatCardModule, MatPaginatorModule
} from '@angular/material';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginFooterComponent, LoginHeaderComponent, LoginContentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        HttpClientModule,
        HttpLinkModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule, 
        MatProgressBarModule, 
        MatTableModule,
        MatSlideToggleModule,
        MatCardModule,
        MatPaginatorModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginContentComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });


  // it('should send credentials on submit', () => {
  //   subject.submitted.subscribe(({ email, password }) => {
  //     expect(email).toEqual(expectedEmail);
  //     expect(password).toEqual(expectedPassword);
  //   });

  // //   expect(loginContentComponent.loginForm.valid).toBeFalsy();
  // //   loginContentComponent.loginForm.controls['login_username'].setValue("admin");
  // //   loginContentComponent.loginForm.controls['login_password'].setValue("admin123");
  // //   expect(loginContentComponent.loginForm.valid).toBeTruthy();

  // //   let user: User;
  // //   // Subscribe to the Observable and store the user in a local variable.
  // //   component.loggedIn.subscribe((value) => user = value);

  // //   // Trigger the login function
  // //  // component.login();
  // //   loginContentComponent.login();

  // //   // Now we can check to make sure the emitted value is correct
  // //   expect(user.email).toBe("test@test.com");
  // //   expect(user.password).toBe("123456789");
  // });


});
