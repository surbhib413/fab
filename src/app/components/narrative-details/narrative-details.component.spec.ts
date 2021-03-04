import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativeDetailsComponent } from './narrative-details.component';

describe('NarrativeDetailsComponent', () => {
  let component: NarrativeDetailsComponent;
  let fixture: ComponentFixture<NarrativeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrativeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
