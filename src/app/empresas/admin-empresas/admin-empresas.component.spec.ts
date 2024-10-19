import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminEmpresasComponent } from './admin-empresas.component';

describe('AdminEmpresasComponent', () => {
  let component: AdminEmpresasComponent;
  let fixture: ComponentFixture<AdminEmpresasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
