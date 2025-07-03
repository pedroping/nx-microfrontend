import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['mfe1'],
  shared: (pkg: string) => {
    if (pkg === '@nx-microfrontend/custom-lib')
      return { singleton: true, requiredVersion: 'auto' };
  },
};

export default config;
