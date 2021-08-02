import { TestBed } from '@angular/core/testing';

import { HeaderUtilFacadeService } from './header-util-facade.service';

describe('HeaderUtilFacadeService', () => {
  let service: HeaderUtilFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderUtilFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
