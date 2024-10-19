import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfocursoComponent } from './infocurso.component';

describe('InfocursoComponent', () => {
  let component: InfocursoComponent;
  let fixture: ComponentFixture<InfocursoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfocursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
