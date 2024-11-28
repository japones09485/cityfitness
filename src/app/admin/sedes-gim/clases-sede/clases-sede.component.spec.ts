import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesSedeComponent } from './clases-sede.component';

describe('ClasesSedeComponent', () => {
  let component: ClasesSedeComponent;
  let fixture: ComponentFixture<ClasesSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasesSedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasesSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
