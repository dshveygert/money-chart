import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodFilterComponent } from './time-period-filter.component';

describe('TimePeriodFilterComponent', () => {
  let component: TimePeriodFilterComponent;
  let fixture: ComponentFixture<TimePeriodFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePeriodFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
