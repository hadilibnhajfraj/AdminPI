import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPubComponent } from './user-pub.component';

describe('UserPubComponent', () => {
  let component: UserPubComponent;
  let fixture: ComponentFixture<UserPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
