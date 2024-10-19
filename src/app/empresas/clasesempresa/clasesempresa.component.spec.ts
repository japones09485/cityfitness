import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClasesempresaComponent } from './clasesempresa.component';

describe('ClasesempresaComponent', () => {
  let component: ClasesempresaComponent;
  let fixture: ComponentFixture<ClasesempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
