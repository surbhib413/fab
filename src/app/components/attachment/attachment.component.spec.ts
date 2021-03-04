import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentComponent } from './attachment.component';
import { MatProgressBarModule } from '@angular/material';

describe('AttachmentComponent', () => {
  let component: AttachmentComponent;
  let fixture: ComponentFixture<AttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentComponent],
      imports: [MatProgressBarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
