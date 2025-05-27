import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectateurComponent } from './spectateur.component';

describe('SpectateurComponent', () => {
  let component: SpectateurComponent;
  let fixture: ComponentFixture<SpectateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
