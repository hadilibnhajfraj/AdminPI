import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchtournoiComponent } from './matchtournoi.component';

describe('MatchtournoiComponent', () => {
  let component: MatchtournoiComponent;
  let fixture: ComponentFixture<MatchtournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchtournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchtournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
