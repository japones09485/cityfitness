import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PresentarexComponent } from './presentarex.component';

describe('PresentarexComponent', () => {
  let component: PresentarexComponent;
  let fixture: ComponentFixture<PresentarexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentarexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentarexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
