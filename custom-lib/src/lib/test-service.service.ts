import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class TestServiceService {
  event$ = new BehaviorSubject<unknown>({});
}
