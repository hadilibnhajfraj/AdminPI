import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEquipeComponent } from './ajouter-equipe.component';

describe('AjouterEquipeComponent', () => {
  let component: AjouterEquipeComponent;
  let fixture: ComponentFixture<AjouterEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
