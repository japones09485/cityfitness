import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuempresaComponent } from './menuempresa.component';

describe('MenuempresaComponent', () => {
  let component: MenuempresaComponent;
  let fixture: ComponentFixture<MenuempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
