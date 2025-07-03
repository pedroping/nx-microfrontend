import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  Type,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TEST_SERVICE_TOKEN,
  TestServiceService
} from '@nx-microfrontend/custom-lib';
import { TestComponent } from 'mfe1/Test';
import { environment } from '../environments/environment.development';

@Component({
  imports: [RouterModule, TestComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TEST_SERVICE_TOKEN, useClass: TestServiceService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  private readonly testServiceService = inject(TEST_SERVICE_TOKEN);
  private vcr = viewChild('vcr', { read: ViewContainerRef });
  title = 'shell';

  ngOnInit(): void {
    this.testServiceService.event$.next('Test');
    this.testServiceService.event$.subscribe((a) => console.log(a));
    this.createScript();
    this.getComponent(() => import('mfe1/Test')).then((a) => {
      if (a) this.vcr()?.createComponent(a);
    });
  }

  private createScript() {
    const script = document.createElement('script');
    script.onload = () => {
      console.log('Load');
    };

    script.src = environment.popUpInfoWebUrl + '/main.js';
    document.body.appendChild(script);
  }

  async getComponent<T>(
    importFn: () => Promise<T>,
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
