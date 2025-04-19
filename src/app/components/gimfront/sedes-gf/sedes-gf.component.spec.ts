import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesGFComponent } from './sedes-gf.component';

describe('SedesGFComponent', () => {
  let component: SedesGFComponent;
  let fixture: ComponentFixture<SedesGFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedesGFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SedesGFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
