import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierJoueurComponent } from './modifier-joueur.component';

describe('ModifierJoueurComponent', () => {
  let component: ModifierJoueurComponent;
  let fixture: ComponentFixture<ModifierJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
