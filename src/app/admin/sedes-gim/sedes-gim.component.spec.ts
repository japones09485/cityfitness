import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesGimComponent } from './sedes-gim.component';

describe('SedesGimComponent', () => {
  let component: SedesGimComponent;
  let fixture: ComponentFixture<SedesGimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedesGimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SedesGimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
