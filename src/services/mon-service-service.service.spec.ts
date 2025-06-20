import { TestBed } from '@angular/core/testing';

import { MonServiceServiceService } from './mon-service-service.service';

describe('MonServiceServiceService', () => {
  let service: MonServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
