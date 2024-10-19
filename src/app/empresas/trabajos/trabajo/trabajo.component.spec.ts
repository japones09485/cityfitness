import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrabajoComponent } from './trabajo.component';

describe('TrabajoComponent', () => {
  let component: TrabajoComponent;
  let fixture: ComponentFixture<TrabajoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
