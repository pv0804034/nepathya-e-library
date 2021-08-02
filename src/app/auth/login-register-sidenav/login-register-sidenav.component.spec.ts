import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterSidenavComponent } from './login-register-sidenav.component';

describe('LoginRegisterSidenavComponent', () => {
  let component: LoginRegisterSidenavComponent;
  let fixture: ComponentFixture<LoginRegisterSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
