import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LCDialogComponent } from './lc-dialog.component';

describe('LCDialogComponent', () => {
  let component: LCDialogComponent;
  let fixture: ComponentFixture<LCDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LCDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
