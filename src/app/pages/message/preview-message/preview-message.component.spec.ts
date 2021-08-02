import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMessageComponent } from './preview-message.component';

describe('PreviewMessageComponent', () => {
  let component: PreviewMessageComponent;
  let fixture: ComponentFixture<PreviewMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
