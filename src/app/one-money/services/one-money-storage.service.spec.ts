import { TestBed } from '@angular/core/testing';

import { OneMoneyStorageService } from './one-money-storage.service';

describe('OneMoneyStorageService', () => {
  let service: OneMoneyStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneMoneyStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
