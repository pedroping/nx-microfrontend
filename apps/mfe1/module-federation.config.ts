import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe1',
  exposes: {
    './Routes': 'apps/mfe1/src/app/remote-entry/entry.routes.ts',
    './Test': 'apps/mfe1/src/app/test/test.component.ts',
  },
  shared: (pkg: string) => {
    if (pkg === '@nx-microfrontend/custom-lib')
      return { singleton: true, requiredVersion: 'auto' };
  },
};

export default config;
