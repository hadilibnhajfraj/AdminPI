import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipetournoiComponent } from './equipetournoi.component';

describe('EquipetournoiComponent', () => {
  let component: EquipetournoiComponent;
  let fixture: ComponentFixture<EquipetournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipetournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipetournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
