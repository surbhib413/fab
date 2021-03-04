import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsFilterDialogComponent } from './accounts-filter-dialog.component';

describe('AccountsFilterDialogComponent', () => {
  let component: AccountsFilterDialogComponent;
  let fixture: ComponentFixture<AccountsFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
