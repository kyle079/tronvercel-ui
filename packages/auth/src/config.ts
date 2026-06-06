import type { AuthConfig } from './types';

export function resolveConfig(overrides: Partial<AuthConfig> = {}): AuthConfig {
  const mode = (overrides.mode ?? process.env.AUTH_MODE ?? 'local') as AuthConfig['mode'];
  if (!['local', 'oidc', 'both'].includes(mode)) {
    throw new Error(`AUTH_MODE must be 'local', 'oidc', or 'both', got: ${mode}`);
  }

  const sessionSecret = overrides.sessionSecret ?? process.env.AUTH_SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error('AUTH_SESSION_SECRET env var is required');
  }

  const maxAgeEnv = process.env.AUTH_SESSION_MAX_AGE;
  const sessionMaxAge = overrides.sessionMaxAge ?? (maxAgeEnv ? parseInt(maxAgeEnv, 10) : 86_400_000);

  const allowlistEnv = process.env.AUTH_ALLOWLIST;
  const allowlist =
    overrides.allowlist ??
    (allowlistEnv ? allowlistEnv.split(',').map((s) => s.trim()).filter(Boolean) : undefined);

  const local: AuthConfig['local'] =
    mode === 'local' || mode === 'both'
      ? {
          usersFile: overrides.local?.usersFile ?? process.env.AUTH_USERS_FILE,
          adminUser: overrides.local?.adminUser ?? process.env.AUTH_ADMIN_USER,
          adminPass: overrides.local?.adminPass ?? process.env.AUTH_ADMIN_PASS,
          ...overrides.local,
        }
      : undefined;

  const oidcIssuer = overrides.oidc?.issuer ?? process.env.AUTH_OIDC_ISSUER;
  const oidcClientId = overrides.oidc?.clientId ?? process.env.AUTH_OIDC_CLIENT_ID;
  const oidcClientSecret = overrides.oidc?.clientSecret ?? process.env.AUTH_OIDC_CLIENT_SECRET;
  const oidcRedirectUri = overrides.oidc?.redirectUri ?? process.env.AUTH_OIDC_REDIRECT_URI;

  let oidc: AuthConfig['oidc'];
  if (mode === 'oidc' || mode === 'both') {
    if (!oidcIssuer) throw new Error('AUTH_OIDC_ISSUER is required for OIDC mode');
    if (!oidcClientId) throw new Error('AUTH_OIDC_CLIENT_ID is required for OIDC mode');
    if (!oidcClientSecret) throw new Error('AUTH_OIDC_CLIENT_SECRET is required for OIDC mode');
    if (!oidcRedirectUri) throw new Error('AUTH_OIDC_REDIRECT_URI is required for OIDC mode');
    oidc = {
      issuer: oidcIssuer,
      clientId: oidcClientId,
      clientSecret: oidcClientSecret,
      redirectUri: oidcRedirectUri,
      scope: overrides.oidc?.scope ?? process.env.AUTH_OIDC_SCOPE ?? 'openid profile email',
      rolesClaim: overrides.oidc?.rolesClaim ?? process.env.AUTH_OIDC_ROLES_CLAIM ?? 'roles',
      allowlistClaim:
        overrides.oidc?.allowlistClaim ??
        process.env.AUTH_OIDC_ALLOWLIST_CLAIM ??
        'preferred_username',
    };
  }

  return {
    mode,
    sessionSecret,
    sessionName: overrides.sessionName ?? process.env.AUTH_SESSION_NAME ?? 'auth_session',
    sessionMaxAge,
    local,
    oidc,
    allowlist,
    userStore: overrides.userStore,
    mountPath: overrides.mountPath ?? process.env.AUTH_MOUNT_PATH ?? '/auth',
    loginPath: overrides.loginPath ?? process.env.AUTH_LOGIN_PATH ?? '/auth/login',
  };
}
