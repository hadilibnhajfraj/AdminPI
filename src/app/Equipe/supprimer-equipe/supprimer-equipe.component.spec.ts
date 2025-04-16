import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerEquipeComponent } from './supprimer-equipe.component';

describe('SupprimerEquipeComponent', () => {
  let component: SupprimerEquipeComponent;
  let fixture: ComponentFixture<SupprimerEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
