import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreConfiguredChartsComponent } from './pre-configured-charts.component';

describe('PreConfiguredChartsComponent', () => {
  let component: PreConfiguredChartsComponent;
  let fixture: ComponentFixture<PreConfiguredChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreConfiguredChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreConfiguredChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
