import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeCompteComponent } from './cree-compte.component';

describe('CreeCompteComponent', () => {
  let component: CreeCompteComponent;
  let fixture: ComponentFixture<CreeCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
