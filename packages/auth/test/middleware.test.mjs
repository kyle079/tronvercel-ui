import assert from 'node:assert/strict';
import test from 'node:test';
import express from 'express';

import authModule from '../dist/index.js';

const { createAuthMiddleware } = authModule;

async function withServer(handler) {
  const app = express();
  const auth = await createAuthMiddleware({
    sessionSecret: 'test-secret',
    mountPath: '/auth',
  });

  app.use(auth.protect({ redirectToLogin: false }));
  app.get('/auth', (_req, res) => res.status(204).end());
  app.get('/auth/login', (_req, res) => res.status(204).end());
  app.get('/authz', (_req, res) => res.status(204).end());
  app.get('/auth-anything', (_req, res) => res.status(204).end());
  app.get('/protected', (_req, res) => res.status(204).end());

  const server = app.listen(0);

  try {
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Failed to bind test server');
    }

    await handler(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

test('protect bypasses only exact mount path and nested auth routes', async () => {
  await withServer(async (baseUrl) => {
    const exactMount = await fetch(`${baseUrl}/auth`);
    assert.equal(exactMount.status, 204);

    const nestedAuthRoute = await fetch(`${baseUrl}/auth/login`);
    assert.equal(nestedAuthRoute.status, 204);

    const siblingPrefix = await fetch(`${baseUrl}/authz`);
    assert.equal(siblingPrefix.status, 401);

    const siblingDashedPrefix = await fetch(`${baseUrl}/auth-anything`);
    assert.equal(siblingDashedPrefix.status, 401);

    const protectedRoute = await fetch(`${baseUrl}/protected`);
    assert.equal(protectedRoute.status, 401);
  });
});
