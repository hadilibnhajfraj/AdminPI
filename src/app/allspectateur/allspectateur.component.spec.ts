import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllspectateurComponent } from './allspectateur.component';

describe('AllspectateurComponent', () => {
  let component: AllspectateurComponent;
  let fixture: ComponentFixture<AllspectateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllspectateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllspectateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
