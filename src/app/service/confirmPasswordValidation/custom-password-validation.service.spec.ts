import { TestBed } from '@angular/core/testing';

import { CustomPasswordValidationService } from './custom-password-validation.service';

describe('CustomPasswordValidationService', () => {
  let service: CustomPasswordValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPasswordValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
