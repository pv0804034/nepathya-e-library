import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCustomTableComponent } from './common-custom-table.component';

describe('CommonCustomTableComponent', () => {
  let component: CommonCustomTableComponent;
  let fixture: ComponentFixture<CommonCustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCustomTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
