import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditvideoempresaComponent } from './editvideoempresa.component';

describe('EditvideoempresaComponent', () => {
  let component: EditvideoempresaComponent;
  let fixture: ComponentFixture<EditvideoempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvideoempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvideoempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
