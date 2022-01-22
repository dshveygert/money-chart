import { TestBed } from '@angular/core/testing';

import { TimePeriodFilterService } from './time-period-filter.service';

describe('TimePeriodFilterService', () => {
  let service: TimePeriodFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimePeriodFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
