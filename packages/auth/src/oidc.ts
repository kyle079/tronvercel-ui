import type { Router } from 'express';
import { Issuer, generators } from 'openid-client';
import type { Client, TokenSet } from 'openid-client';
import type { AuthConfig, AuthUser } from './types';

let cachedClient: Client | null = null;

export async function getOidcClient(config: AuthConfig): Promise<Client> {
  if (cachedClient) return cachedClient;
  const oidcCfg = config.oidc!;
  const issuer = await Issuer.discover(oidcCfg.issuer);
  cachedClient = new issuer.Client({
    client_id: oidcCfg.clientId,
    client_secret: oidcCfg.clientSecret,
    redirect_uris: [oidcCfg.redirectUri],
    response_types: ['code'],
  });
  return cachedClient;
}

function extractRoles(claims: Record<string, unknown>, rolesClaim: string): string[] {
  const raw = claims[rolesClaim];
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') return [raw];
  return [];
}

export function mountOidcRoutes(router: Router, config: AuthConfig): void {
  const oidcCfg = config.oidc!;
  const scope = oidcCfg.scope ?? 'openid profile email';
  const rolesClaim = oidcCfg.rolesClaim ?? 'roles';
  const allowlistClaim = oidcCfg.allowlistClaim ?? 'preferred_username';

  router.get('/sso', async (req, res) => {
    try {
      const client = await getOidcClient(config);
      const state = generators.state();
      const nonce = generators.nonce();
      req.session.oidcState = state;
      req.session.oidcNonce = nonce;
      req.session.save((err) => {
        if (err) {
          res.status(500).send('Session error');
          return;
        }
        const url = client.authorizationUrl({ scope, state, nonce });
        res.redirect(url);
      });
    } catch {
      res.status(502).json({ error: 'OIDC provider unavailable' });
    }
  });

  router.get('/callback', async (req, res) => {
    try {
      const client = await getOidcClient(config);
      const params = client.callbackParams(req);
      const storedState = req.session.oidcState;
      const storedNonce = req.session.oidcNonce;

      if (!storedState || params.state !== storedState) {
        res.status(400).send('Invalid state');
        return;
      }

      let tokenSet: TokenSet;
      try {
        tokenSet = await client.callback(oidcCfg.redirectUri, params, {
          state: storedState,
          nonce: storedNonce,
        });
      } catch {
        res.status(401).send('Authentication failed');
        return;
      }

      const claims = tokenSet.claims();
      const username =
        (claims[allowlistClaim] as string | undefined) ??
        (claims['email'] as string | undefined) ??
        (claims['sub'] as string);

      if (config.allowlist && config.allowlist.length > 0) {
        if (!config.allowlist.includes(username)) {
          res.status(403).send('Access denied');
          return;
        }
      }

      const authUser: AuthUser = {
        id: claims.sub,
        username,
        roles: extractRoles(claims as Record<string, unknown>, rolesClaim),
        provider: 'oidc',
        claims: claims as Record<string, unknown>,
      };

      delete req.session.oidcState;
      delete req.session.oidcNonce;
      req.session.user = authUser;
      req.session.save((err) => {
        if (err) {
          res.status(500).send('Session error');
          return;
        }
        const returnTo = (req.session as { returnTo?: string }).returnTo ?? '/';
        delete (req.session as { returnTo?: string }).returnTo;
        res.redirect(returnTo);
      });
    } catch {
      res.status(500).send('Authentication error');
    }
  });
}
