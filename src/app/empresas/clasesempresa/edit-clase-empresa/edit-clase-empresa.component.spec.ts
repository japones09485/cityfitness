import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditClaseEmpresaComponent } from './edit-clase-empresa.component';

describe('EditClaseEmpresaComponent', () => {
  let component: EditClaseEmpresaComponent;
  let fixture: ComponentFixture<EditClaseEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClaseEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClaseEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
