import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewClaseEmpresaComponent } from './new-clase-empresa.component';

describe('NewClaseEmpresaComponent', () => {
  let component: NewClaseEmpresaComponent;
  let fixture: ComponentFixture<NewClaseEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClaseEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClaseEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
