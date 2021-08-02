import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCkeditorComponent } from './customer-ckeditor.component';

describe('CustomerCkeditorComponent', () => {
  let component: CustomerCkeditorComponent;
  let fixture: ComponentFixture<CustomerCkeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCkeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
