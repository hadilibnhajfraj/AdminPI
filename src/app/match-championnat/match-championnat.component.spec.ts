import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchChampionnatComponent } from './match-championnat.component';

describe('MatchChampionnatComponent', () => {
  let component: MatchChampionnatComponent;
  let fixture: ComponentFixture<MatchChampionnatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchChampionnatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchChampionnatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
