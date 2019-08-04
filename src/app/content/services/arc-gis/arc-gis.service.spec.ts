import { TestBed } from '@angular/core/testing';

import { ArcGisService } from './arc-gis.service';

describe('ArcGisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArcGisService = TestBed.get(ArcGisService);
    expect(service).toBeTruthy();
  });
});
