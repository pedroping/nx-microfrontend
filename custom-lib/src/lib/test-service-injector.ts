import { InjectionToken } from '@angular/core';
import { TestServiceService } from './test-service.service';

const TEST_SERVICE_INJECTOR = 'testLib';

export const TEST_SERVICE_TOKEN = new InjectionToken<TestServiceService>(
  TEST_SERVICE_INJECTOR
);
