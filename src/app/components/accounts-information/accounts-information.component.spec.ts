import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsInformationComponent } from './accounts-information.component';

describe('AccountsInformationComponent', () => {
  let component: AccountsInformationComponent;
  let fixture: ComponentFixture<AccountsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
