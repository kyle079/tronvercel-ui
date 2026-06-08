const test = require('node:test');
const assert = require('node:assert/strict');
const { register } = require('esbuild-register/dist/node');

register({
  target: 'node20',
  format: 'cjs',
});

const { createAuthMiddleware } = require('../src/middleware.ts');
const { resolveConfig, resolveLoginPath } = require('../src/config.ts');

test('resolveLoginPath derives the default login route from mountPath', () => {
  assert.equal(resolveLoginPath('/auth'), '/auth/login');
  assert.equal(resolveLoginPath('/internal-auth'), '/internal-auth/login');
  assert.equal(resolveLoginPath('/internal-auth/', undefined), '/internal-auth/login');
  assert.equal(resolveLoginPath('/', undefined), '/login');
});

test('resolveConfig honors explicit loginPath overrides', () => {
  const config = resolveConfig({
    mode: 'local',
    sessionSecret: 'secret',
    mountPath: '/internal-auth',
    loginPath: '/sign-in',
  });

  assert.equal(config.loginPath, '/sign-in');
});

test('protect redirects unauthenticated requests to the derived loginPath', async () => {
  const auth = await createAuthMiddleware({
    mode: 'local',
    sessionSecret: 'secret',
    mountPath: '/internal-auth',
    local: {},
  });

  const handler = auth.protect();
  let redirectedTo;
  let nextCalled = false;

  const req = {
    path: '/dashboard',
    originalUrl: '/dashboard?tab=overview',
    session: {
      save(callback) {
        callback();
      },
    },
  };

  const res = {
    redirect(location) {
      redirectedTo = location;
    },
  };

  handler(req, res, () => {
    nextCalled = true;
  });

  assert.equal(req.session.returnTo, '/dashboard?tab=overview');
  assert.equal(redirectedTo, '/internal-auth/login');
  assert.equal(nextCalled, false);
});

test('protect skips redirects for requests under the auth mountPath', async () => {
  const auth = await createAuthMiddleware({
    mode: 'local',
    sessionSecret: 'secret',
    mountPath: '/internal-auth',
    local: {},
  });

  const handler = auth.protect();
  let redirectedTo;
  let nextCalled = false;

  const req = {
    path: '/internal-auth/login',
    originalUrl: '/internal-auth/login',
    session: {
      save(callback) {
        callback();
      },
    },
  };

  const res = {
    redirect(location) {
      redirectedTo = location;
    },
  };

  handler(req, res, () => {
    nextCalled = true;
  });

  assert.equal(redirectedTo, undefined);
  assert.equal(nextCalled, true);
});
