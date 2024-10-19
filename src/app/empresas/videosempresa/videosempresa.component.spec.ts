import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideosempresaComponent } from './videosempresa.component';

describe('VideosempresaComponent', () => {
  let component: VideosempresaComponent;
  let fixture: ComponentFixture<VideosempresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
