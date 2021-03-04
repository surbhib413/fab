import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorChartComponent } from './mirror-chart.component';

describe('MirrorChartComponent', () => {
  let component: MirrorChartComponent;
  let fixture: ComponentFixture<MirrorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirrorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
