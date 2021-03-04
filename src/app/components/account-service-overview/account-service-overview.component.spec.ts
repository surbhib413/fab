import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountServiceOverviewComponent } from './account-service-overview.component';

describe('AccountServiceOverviewComponent', () => {
  let component: AccountServiceOverviewComponent;
  let fixture: ComponentFixture<AccountServiceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountServiceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountServiceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
