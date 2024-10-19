import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsociosempresaseditComponent } from './websociosempresasedit.component';

describe('WebsociosempresaseditComponent', () => {
  let component: WebsociosempresaseditComponent;
  let fixture: ComponentFixture<WebsociosempresaseditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsociosempresaseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsociosempresaseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
