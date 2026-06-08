/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const { Issuer } = require('openid-client');
const { getOidcClient, resetOidcClientCacheForTests } = require('../dist/oidc.js');

function createConfig(overrides = {}) {
  return {
    mode: 'oidc',
    sessionSecret: 'secret',
    oidc: {
      issuer: 'https://issuer.example.com',
      clientId: 'client-a',
      clientSecret: 'secret-a',
      redirectUri: 'https://app.example.com/auth/callback',
      ...overrides,
    },
  };
}

function createDiscoverStub(discoverCalls) {
  return async (issuerUrl) => {
    discoverCalls.push(issuerUrl);
    return {
      Client: class MockClient {
        constructor(metadata) {
          this.metadata = metadata;
        }
      },
    };
  };
}

test('reuses the client for the same OIDC configuration', async () => {
  resetOidcClientCacheForTests();

  const discoverCalls = [];
  const originalDiscover = Issuer.discover;
  Issuer.discover = createDiscoverStub(discoverCalls);

  try {
    const config = createConfig();
    const firstClient = await getOidcClient(config);
    const secondClient = await getOidcClient(config);

    assert.strictEqual(firstClient, secondClient);
    assert.deepStrictEqual(discoverCalls, ['https://issuer.example.com']);
  } finally {
    Issuer.discover = originalDiscover;
    resetOidcClientCacheForTests();
  }
});

test('creates distinct clients for distinct OIDC configurations', async () => {
  resetOidcClientCacheForTests();

  const discoverCalls = [];
  const originalDiscover = Issuer.discover;
  Issuer.discover = createDiscoverStub(discoverCalls);

  try {
    const firstConfig = createConfig();
    const secondConfig = createConfig({
      issuer: 'https://second-issuer.example.com',
      clientId: 'client-b',
      clientSecret: 'secret-b',
      redirectUri: 'https://second-app.example.com/auth/callback',
    });

    const firstClient = await getOidcClient(firstConfig);
    const secondClient = await getOidcClient(secondConfig);

    assert.notStrictEqual(firstClient, secondClient);
    assert.deepStrictEqual(discoverCalls, [
      'https://issuer.example.com',
      'https://second-issuer.example.com',
    ]);
  } finally {
    Issuer.discover = originalDiscover;
    resetOidcClientCacheForTests();
  }
});
