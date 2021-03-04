import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLcDialogComponent } from './create-lc-dialog.component';

describe('CreateLcDialogComponent', () => {
  let component: CreateLcDialogComponent;
  let fixture: ComponentFixture<CreateLcDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLcDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
