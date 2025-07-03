import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  TEST_SERVICE_TOKEN
} from '@nx-microfrontend/custom-lib';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent, RouterLink],
  selector: 'app-mfe1-entry',
  template: `
    <app-nx-welcome></app-nx-welcome>
    <button routerLink="other-page">Change</button>
  `,
})
export class RemoteEntryComponent implements OnInit {
  private readonly testServiceService = inject(TEST_SERVICE_TOKEN);
  ngOnInit(): void {
    this.testServiceService.event$.subscribe((a) => console.log(a));

    this.testServiceService.event$.next('Test 2');
  }
}
