import { TestBed } from '@angular/core/testing';

import { FicheImpayeService } from './fiche-impaye.service';

describe('FicheImpayeService', () => {
  let service: FicheImpayeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheImpayeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
