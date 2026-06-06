import type { RequestHandler, Router } from 'express';
import express, { Router as createRouter } from 'express';
import session from 'express-session';
import type { AuthConfig, AuthUser } from './types';
import { resolveConfig } from './config';
import { buildLocalStore, mountLocalRoutes } from './local';
import { mountOidcRoutes } from './oidc';

export interface AuthMiddleware {
  router: Router;
  protect: (options?: ProtectOptions) => RequestHandler;
  forwardAuth: () => RequestHandler;
  currentUser: () => RequestHandler;
}

export interface ProtectOptions {
  exclude?: string[];
  redirectToLogin?: boolean;
}

export async function createAuthMiddleware(
  overrides: Partial<AuthConfig> = {},
): Promise<AuthMiddleware> {
  const config = resolveConfig(overrides);
  const router = createRouter();

  router.use(
    session({
      name: config.sessionName,
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: config.sessionMaxAge,
      },
    }),
  );

  router.use(express.json());

  if (config.mode === 'local' || config.mode === 'both') {
    const store = await buildLocalStore(config);
    mountLocalRoutes(router, store, config);
  }

  if (config.mode === 'oidc' || config.mode === 'both') {
    mountOidcRoutes(router, config);
  }

  router.get('/me', (req, res) => {
    const user = req.session?.user as AuthUser | undefined;
    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    res.json({ user });
  });

  router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: 'Logout failed' });
        return;
      }
      res.clearCookie(config.sessionName ?? 'auth_session');
      const isApi = req.headers['accept']?.includes('application/json');
      if (isApi) {
        res.json({ ok: true });
      } else {
        res.redirect(config.loginPath ?? '/auth/login');
      }
    });
  });

  const protect = (options: ProtectOptions = {}): RequestHandler => {
    return (req, res, next) => {
      const { exclude = [], redirectToLogin = true } = options;
      const pathname = req.path;

      const mountPath = config.mountPath ?? '/auth';
      if (pathname.startsWith(mountPath)) {
        next();
        return;
      }

      for (const pattern of exclude) {
        if (pathname === pattern || pathname.startsWith(pattern + '/')) {
          next();
          return;
        }
      }

      const user = req.session?.user as AuthUser | undefined;
      if (user) {
        (req as { user?: AuthUser }).user = user;
        next();
        return;
      }

      if (redirectToLogin) {
        req.session.returnTo = req.originalUrl;
        req.session.save(() => {
          res.redirect(config.loginPath ?? '/auth/login');
        });
      } else {
        res.status(401).json({ error: 'Not authenticated' });
      }
    };
  };

  const forwardAuth = (): RequestHandler => {
    return (req, res) => {
      const user = req.session?.user as AuthUser | undefined;
      if (user) {
        res.set('X-Auth-User', user.username);
        res.set('X-Auth-Roles', user.roles.join(','));
        res.status(200).send('OK');
      } else {
        res.status(401).set('X-Auth-Required', '1').send('Unauthorized');
      }
    };
  };

  const currentUser = (): RequestHandler => {
    return (req, _res, next) => {
      const user = req.session?.user as AuthUser | undefined;
      if (user) {
        (req as { user?: AuthUser }).user = user;
      }
      next();
    };
  };

  return { router, protect, forwardAuth, currentUser };
}
