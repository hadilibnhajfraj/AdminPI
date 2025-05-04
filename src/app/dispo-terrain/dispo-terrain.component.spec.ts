import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispoTerrainComponent } from './dispo-terrain.component';

describe('DispoTerrainComponent', () => {
  let component: DispoTerrainComponent;
  let fixture: ComponentFixture<DispoTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispoTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispoTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
