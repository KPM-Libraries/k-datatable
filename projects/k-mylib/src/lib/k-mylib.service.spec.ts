import { TestBed } from '@angular/core/testing';

import { KMylibService } from './k-mylib.service';

describe('KMylibService', () => {
  let service: KMylibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KMylibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
