import { TestBed } from '@angular/core/testing';

import { DbAccessService } from './db-access.service';

describe('DbAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbAccessService = TestBed.get(DbAccessService);
    expect(service).toBeTruthy();
  });
});
