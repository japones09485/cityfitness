import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultadosComponent } from './resultados.component';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
