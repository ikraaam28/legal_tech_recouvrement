import { TestBed } from '@angular/core/testing';

import { FichiersService } from './fichiers.service';

describe('FichiersService', () => {
  let service: FichiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
