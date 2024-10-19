import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsociosinstructoresComponent } from './websociosinstructores.component';

describe('WebsociosinstructoresComponent', () => {
  let component: WebsociosinstructoresComponent;
  let fixture: ComponentFixture<WebsociosinstructoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsociosinstructoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsociosinstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
