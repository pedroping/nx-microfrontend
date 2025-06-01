import {
  Component,
  inject,
  OnInit,
  ProviderToken,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TEST_SERVICE_INJECTOR,
  TestServiceService,
} from '@nx-microfrontend/custom-lib';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TEST_SERVICE_INJECTOR, useClass: TestServiceService }],
})
export class AppComponent implements OnInit {
  private readonly testServiceService = inject(
    TEST_SERVICE_INJECTOR as unknown as ProviderToken<TestServiceService>
  );
  private vcr = viewChild('vcr', { read: ViewContainerRef });

  ngOnInit(): void {
    this.testServiceService.event$.next('Test');
    this.testServiceService.event$.subscribe((a) => console.log(a));

    import('mfe1/Test').then((a) => {
      this.vcr()?.createComponent(a.TestComponent);
    });
  }

  title = 'shell';
}
