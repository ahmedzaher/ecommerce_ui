import { TestBed } from '@angular/core/testing';

import { CommunicatationService } from './communicatation.service';

describe('CommunicatationService', () => {
  let service: CommunicatationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicatationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
