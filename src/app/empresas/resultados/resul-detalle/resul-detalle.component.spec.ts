import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResulDetalleComponent } from './resul-detalle.component';

describe('ResulDetalleComponent', () => {
  let component: ResulDetalleComponent;
  let fixture: ComponentFixture<ResulDetalleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResulDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResulDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
