import { TestBed } from '@angular/core/testing';

import { LcFormService } from './lc-form.service';

describe('LcFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LcFormService = TestBed.get(LcFormService);
    expect(service).toBeTruthy();
  });
});

