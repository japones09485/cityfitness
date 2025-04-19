import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSedeComponent } from './info-sede.component';

describe('InfoSedeComponent', () => {
  let component: InfoSedeComponent;
  let fixture: ComponentFixture<InfoSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoSedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
