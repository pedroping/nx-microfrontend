import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ProviderToken } from '@angular/core';
import {
  TEST_SERVICE_INJECTOR,
  TestServiceService,
} from '@nx-microfrontend/custom-lib';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, NxWelcomeComponent, RouterLink],
  selector: 'app-mfe1-entry',
  template: `
    <app-nx-welcome></app-nx-welcome> 
    <button routerLink="other-page">Change</button>
  `,
})
export class RemoteEntryComponent implements OnInit {
  private readonly testServiceService = inject(
    TEST_SERVICE_INJECTOR as unknown as ProviderToken<TestServiceService>
  );
  ngOnInit(): void {
    this.testServiceService.event$.subscribe((a) => console.log(a));

    this.testServiceService.event$.next('Test 2');
  }
}
