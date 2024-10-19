import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntructorPageComponent } from './intructor-page.component';

describe('IntructorPageComponent', () => {
  let component: IntructorPageComponent;
  let fixture: ComponentFixture<IntructorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntructorPageComponent]
    });
    fixture = TestBed.createComponent(IntructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
