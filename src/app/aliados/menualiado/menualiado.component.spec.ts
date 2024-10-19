import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenualiadoComponent } from './menualiado.component';

describe('MenualiadoComponent', () => {
  let component: MenualiadoComponent;
  let fixture: ComponentFixture<MenualiadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenualiadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenualiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
