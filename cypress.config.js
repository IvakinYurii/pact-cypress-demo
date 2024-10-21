const { defineConfig } = require('cypress');
const { Pact } = require('@pact-foundation/pact');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      let pactProvider;

      on('task', {
        async createPactProvider(options) {
          pactProvider = new Pact({
            consumer: 'OrderService',
            provider: 'CardPaymentService',
            port: 8282,
            log: process.cwd() + '/logs/pact.log',
            dir: process.cwd() + '/pacts',
            logLevel: 'debug',
            spec: 2,
            ...options,
          });
          return null;
        },
        async startPactProvider() {
          if (pactProvider) {
            await pactProvider.setup();
          }
          return null;
        },
        async addInteraction(interaction) {
          if (pactProvider) {
            await pactProvider.addInteraction(interaction);
          }
          return null;
        },
        async verifyPact() {
          if (pactProvider) {
            await pactProvider.verify();
          }
          return null;
        },
        async finalizePact() {
          if (pactProvider) {
            await pactProvider.finalize();
          }
          return null;
        },
      });

      return config;
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});