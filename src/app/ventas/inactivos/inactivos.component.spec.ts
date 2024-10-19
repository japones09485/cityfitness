import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InactivosComponent } from './inactivos.component';

describe('InactivosComponent', () => {
  let component: InactivosComponent;
  let fixture: ComponentFixture<InactivosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
