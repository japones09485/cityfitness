import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlanesempresaComponent } from './planesempresa.component';

describe('PlanesempresaComponent', () => {
  let component: PlanesempresaComponent;
  let fixture: ComponentFixture<PlanesempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
