import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrontWebsociosInstructoresComponent } from './front-websocios-instructores.component';

describe('FrontWebsociosInstructoresComponent', () => {
  let component: FrontWebsociosInstructoresComponent;
  let fixture: ComponentFixture<FrontWebsociosInstructoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontWebsociosInstructoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontWebsociosInstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
