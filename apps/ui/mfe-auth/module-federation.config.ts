import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'uiAuth',
  exposes: {
    './Routes': 'apps/ui/mfe-auth/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (libraryName?.includes('@wes')) {
      return {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      };
    }
    return sharedConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
