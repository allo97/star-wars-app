import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run star-wars-app:serve',
        production: 'npx nx run star-wars-app:serve-static'
      },
      ciWebServerCommand: 'npx nx run star-wars-app:serve-static'
    }),
    baseUrl: 'http://localhost:4200'
  }
});
