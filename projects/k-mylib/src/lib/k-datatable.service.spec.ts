import { TestBed } from '@angular/core/testing';

import { KDatatableService } from './k-datatable.service';

describe('KDatatableService', () => {
  let service: KDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KDatatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
