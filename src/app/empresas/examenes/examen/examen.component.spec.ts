import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExamenComponent } from './examen.component';

describe('ExamenComponent', () => {
  let component: ExamenComponent;
  let fixture: ComponentFixture<ExamenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
