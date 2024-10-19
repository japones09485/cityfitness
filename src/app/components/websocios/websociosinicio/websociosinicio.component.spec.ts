import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsociosinicioComponent } from './websociosinicio.component';

describe('WebsociosinicioComponent', () => {
  let component: WebsociosinicioComponent;
  let fixture: ComponentFixture<WebsociosinicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsociosinicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsociosinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
