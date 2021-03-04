import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListFilterModalComponent } from './account-list-filter-modal.component';

describe('AccountListFilterModalComponent', () => {
  let component: AccountListFilterModalComponent;
  let fixture: ComponentFixture<AccountListFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountListFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
