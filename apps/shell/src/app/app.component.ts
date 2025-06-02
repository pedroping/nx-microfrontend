import {
  Component,
  inject,
  OnInit,
  ProviderToken,
  Type,
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
  title = 'shell';

  ngOnInit(): void {
    this.testServiceService.event$.next('Test');
    this.testServiceService.event$.subscribe((a) => console.log(a));

    this.getComponent(() => import('mfe1/Test')).then((a) => {
      if (a) this.vcr()?.createComponent(a);
    });
  }

  async getComponent<T>(
    importFn: () => Promise<T>
  ): Promise<Type<T> | undefined> {
    try {
      const result = await importFn();
      const componentKey = Object.keys(result ?? {})[0];
      return result[componentKey as keyof typeof result] as Type<T>;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}
