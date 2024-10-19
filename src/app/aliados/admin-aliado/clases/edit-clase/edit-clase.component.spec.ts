import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditClaseComponent } from './edit-clase.component';

describe('EditClaseComponent', () => {
  let component: EditClaseComponent;
  let fixture: ComponentFixture<EditClaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
