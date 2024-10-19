import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpresasAliadasComponent } from './empresas-aliadas.component';

describe('EmpresasAliadasComponent', () => {
  let component: EmpresasAliadasComponent;
  let fixture: ComponentFixture<EmpresasAliadasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasAliadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAliadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
