import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CronogramaComponent } from './cronograma.component';

describe('CronogramaComponent', () => {
  let component: CronogramaComponent;
  let fixture: ComponentFixture<CronogramaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CronogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
