const test = require('node:test');
const assert = require('node:assert/strict');
const { register } = require('esbuild-register/dist/node');

register({
  target: 'node20',
  format: 'cjs',
  jsx: 'automatic',
  tsconfigRaw: {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
      },
    },
  },
});
require('tsconfig-paths/register');

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { SSOButton } = require('../src/components/ui/auth/SSOButton.tsx');

test('SSOButton renders a single interactive anchor by default', () => {
  const markup = renderToStaticMarkup(
    React.createElement(SSOButton, {
      label: 'Single Sign-On',
      href: '/internal-auth/sso',
    }),
  );

  assert.match(markup, /^<a\b/);
  assert.match(markup, /href="\/internal-auth\/sso"/);
  assert.doesNotMatch(markup, /<button\b/);
  assert.match(markup, /Continue with Single Sign-On/);
});

test('SSOButton renders a non-interactive disabled state without nested controls', () => {
  const markup = renderToStaticMarkup(
    React.createElement(SSOButton, {
      label: 'SSO',
      disabled: true,
    }),
  );

  assert.match(markup, /^<span\b/);
  assert.match(markup, /aria-disabled="true"/);
  assert.doesNotMatch(markup, /href=/);
  assert.doesNotMatch(markup, /<button\b/);
});
