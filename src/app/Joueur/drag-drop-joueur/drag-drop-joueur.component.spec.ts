import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropJoueurComponent } from './drag-drop-joueur.component';

describe('DragDropJoueurComponent', () => {
  let component: DragDropJoueurComponent;
  let fixture: ComponentFixture<DragDropJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
