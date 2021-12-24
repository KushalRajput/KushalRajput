import { TestBed } from '@angular/core/testing';

import { ServicePortalService } from './service-portal.service';

describe('ServicePortalService', () => {
  let service: ServicePortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
