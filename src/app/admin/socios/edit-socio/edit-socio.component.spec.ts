import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSocioComponent } from './edit-socio.component';

describe('EditSocioComponent', () => {
  let component: EditSocioComponent;
  let fixture: ComponentFixture<EditSocioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
