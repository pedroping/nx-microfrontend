/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestServiceService } from './test-service.service';

describe('Service: TestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestServiceService]
    });
  });

  it('should ...', inject([TestServiceService], (service: TestServiceService) => {
    expect(service).toBeTruthy();
  }));
});
