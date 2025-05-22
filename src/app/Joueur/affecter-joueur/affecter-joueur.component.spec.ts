import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterJoueurComponent } from './affecter-joueur.component';

describe('AffecterJoueurComponent', () => {
  let component: AffecterJoueurComponent;
  let fixture: ComponentFixture<AffecterJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
