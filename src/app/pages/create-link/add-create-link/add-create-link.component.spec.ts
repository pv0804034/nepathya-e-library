import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreateLinkComponent } from './add-create-link.component';

describe('AddCreateLinkComponent', () => {
  let component: AddCreateLinkComponent;
  let fixture: ComponentFixture<AddCreateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreateLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
