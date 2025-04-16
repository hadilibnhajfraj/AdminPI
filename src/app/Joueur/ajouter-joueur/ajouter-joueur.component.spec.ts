import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterJoueurComponent } from './ajouter-joueur.component';

describe('AjouterJoueurComponent', () => {
  let component: AjouterJoueurComponent;
  let fixture: ComponentFixture<AjouterJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
