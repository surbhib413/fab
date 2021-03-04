import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountServicesAdvancedFiltersComponent } from './account-services-advanced-filters.component';

describe('AccountServicesAdvancedFiltersComponent', () => {
  let component: AccountServicesAdvancedFiltersComponent;
  let fixture: ComponentFixture<AccountServicesAdvancedFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountServicesAdvancedFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountServicesAdvancedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
