import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  {
    path: 'other-page',
    loadComponent: () =>
      import('../other-page/other-page.component').then(
        (m) => m.OtherPageComponent,
      ),
  },
];
