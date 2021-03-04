import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFilterModalComponent } from './chart-filter-modal.component';

describe('ChartFilterModalComponent', () => {
  let component: ChartFilterModalComponent;
  let fixture: ComponentFixture<ChartFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
