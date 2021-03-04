import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendForecastGraphComponent } from './trend-forecast-graph.component';

describe('TrendForecastGraphComponent', () => {
  let component: TrendForecastGraphComponent;
  let fixture: ComponentFixture<TrendForecastGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendForecastGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendForecastGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
