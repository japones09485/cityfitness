import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlumnosempresaComponent } from './alumnosempresa.component';

describe('AlumnosempresaComponent', () => {
  let component: AlumnosempresaComponent;
  let fixture: ComponentFixture<AlumnosempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
