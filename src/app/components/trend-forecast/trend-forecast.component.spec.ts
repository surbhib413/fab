import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendForecastComponent } from './trend-forecast.component';

describe('TrendForecastComponent', () => {
  let component: TrendForecastComponent;
  let fixture: ComponentFixture<TrendForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
