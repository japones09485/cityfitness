import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideosAliadosComponent } from './videos-aliados.component';

describe('VideosAliadosComponent', () => {
  let component: VideosAliadosComponent;
  let fixture: ComponentFixture<VideosAliadosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosAliadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosAliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
