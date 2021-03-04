import { TestBed } from '@angular/core/testing';

import { PrefernceFormService } from './prefernce-form.service';

describe('PrefernceFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrefernceFormService = TestBed.get(PrefernceFormService);
    expect(service).toBeTruthy();
  });
});
