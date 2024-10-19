import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsociosempresasComponent } from './websociosempresas.component';

describe('WebsociosempresasComponent', () => {
  let component: WebsociosempresasComponent;
  let fixture: ComponentFixture<WebsociosempresasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsociosempresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsociosempresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
