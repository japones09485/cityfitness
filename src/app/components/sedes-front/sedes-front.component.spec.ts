import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SedesFrontComponent } from './sedes-front.component';

describe('SedesFrontComponent', () => {
  let component: SedesFrontComponent;
  let fixture: ComponentFixture<SedesFrontComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SedesFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedesFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
