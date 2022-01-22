import { TestBed } from '@angular/core/testing';

import { DataRecordService } from './data-record.service';

describe('DataRecordService', () => {
  let service: DataRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
