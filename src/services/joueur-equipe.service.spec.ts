import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { JoueurEquipeService } from './joueur-equipe.service';
import { Equipe } from '../../src/app/model/equipe';

describe('JoueurEquipeService', () => {
  let service: JoueurEquipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JoueurEquipeService]
    });

    service = TestBed.inject(JoueurEquipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait ajouter un joueur à une équipe', () => {
    const dummyEquipe: Equipe = { idEquipe: 1, nom: 'Team A', logo: '', adresse: '', nb_joueur: 10 };

    service.ajouterJoueur(1, 2).subscribe(equipe => {
      expect(equipe).toEqual(dummyEquipe);
    });

    const req = httpMock.expectOne('http://localhost:8082/equipes/1/addPlayer/2');
    expect(req.request.method).toBe('POST');
    req.flush(dummyEquipe);
  });

  it('devrait retirer un joueur d\'une équipe', () => {
    const dummyEquipe: Equipe = { idEquipe: 1, nom: 'Team A', logo: '', adresse: '', nb_joueur: 9 };

    service.retirerJoueur(1, 2).subscribe(equipe => {
      expect(equipe).toEqual(dummyEquipe);
    });

    const req = httpMock.expectOne('http://localhost:8082/equipes/1/removePlayer/2');
    expect(req.request.method).toBe('POST');
    req.flush(dummyEquipe);
  });
});
