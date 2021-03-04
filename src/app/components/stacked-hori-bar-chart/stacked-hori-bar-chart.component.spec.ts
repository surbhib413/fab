import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedHoriBarChartComponent } from './stacked-hori-bar-chart.component';

describe('StackedHoriBarChartComponent', () => {
  let component: StackedHoriBarChartComponent;
  let fixture: ComponentFixture<StackedHoriBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedHoriBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedHoriBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
