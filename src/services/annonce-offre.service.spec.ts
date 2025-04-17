import { TestBed } from '@angular/core/testing';

import { AnnonceOffreService } from './annonce-offre.service';

describe('AnnonceOffreService', () => {
  let service: AnnonceOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
