import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

export default withModuleFederation(
  {
    ...config,
    remotes: [
      ['mfe1', 'http://localhost:4201'],
    ],
  },
  { dts: false }
);
