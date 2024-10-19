import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrontWebsociosempresasComponent } from './front-websociosempresas.component';

describe('FrontWebsociosempresasComponent', () => {
  let component: FrontWebsociosempresasComponent;
  let fixture: ComponentFixture<FrontWebsociosempresasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontWebsociosempresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontWebsociosempresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
