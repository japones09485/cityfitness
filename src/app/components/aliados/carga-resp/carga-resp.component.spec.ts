import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CargaRespComponent } from './carga-resp.component';

describe('CargaRespComponent', () => {
  let component: CargaRespComponent;
  let fixture: ComponentFixture<CargaRespComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaRespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
