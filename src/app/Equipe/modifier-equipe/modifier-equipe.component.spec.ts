import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEquipeComponent } from './modifier-equipe.component';

describe('ModifierEquipeComponent', () => {
  let component: ModifierEquipeComponent;
  let fixture: ComponentFixture<ModifierEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
