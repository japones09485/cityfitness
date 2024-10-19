import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RespuestaComponent } from './respuesta.component';

describe('RespuestaComponent', () => {
  let component: RespuestaComponent;
  let fixture: ComponentFixture<RespuestaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
