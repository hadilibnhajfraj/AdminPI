import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherEquipeComponent } from './afficher-equipe.component';

describe('AfficherEquipeComponent', () => {
  let component: AfficherEquipeComponent;
  let fixture: ComponentFixture<AfficherEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
