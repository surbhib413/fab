import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBubbleGraphComponent } from './line-bubble-graph.component';

describe('LineBubbleGraphComponent', () => {
  let component: LineBubbleGraphComponent;
  let fixture: ComponentFixture<LineBubbleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineBubbleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineBubbleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
