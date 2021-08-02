import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateLinkComponent } from './edit-create-link.component';

describe('EditCreateLinkComponent', () => {
  let component: EditCreateLinkComponent;
  let fixture: ComponentFixture<EditCreateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
