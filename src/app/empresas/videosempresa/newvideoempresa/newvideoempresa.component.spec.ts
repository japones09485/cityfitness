import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewvideoempresaComponent } from './newvideoempresa.component';

describe('NewvideoempresaComponent', () => {
  let component: NewvideoempresaComponent;
  let fixture: ComponentFixture<NewvideoempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewvideoempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvideoempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
