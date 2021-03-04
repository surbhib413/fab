import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendCurrencyDialogComponent } from './trend-currency-dialog.component';

describe('TrendCurrencyDialogComponent', () => {
  let component: TrendCurrencyDialogComponent;
  let fixture: ComponentFixture<TrendCurrencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendCurrencyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendCurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
