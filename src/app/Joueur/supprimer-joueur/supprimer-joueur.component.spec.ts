import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerJoueurComponent } from './supprimer-joueur.component';

describe('SupprimerJoueurComponent', () => {
  let component: SupprimerJoueurComponent;
  let fixture: ComponentFixture<SupprimerJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
