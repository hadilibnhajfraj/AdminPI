import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirerJoueurComponent } from './retirer-joueur.component';

describe('RetirerJoueurComponent', () => {
  let component: RetirerJoueurComponent;
  let fixture: ComponentFixture<RetirerJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirerJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirerJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
