import type { Router } from 'express';
import type { AuthConfig, AuthUser, UserStore } from './types';
import { hashPassword, isHash, verifyPassword } from './password';
import { MemoryStore, FileStore } from './store';

export async function buildLocalStore(config: AuthConfig): Promise<UserStore> {
  const localCfg = config.local!;

  let store: UserStore;
  if (config.userStore) {
    store = config.userStore;
  } else if (localCfg.usersFile) {
    store = new FileStore(localCfg.usersFile);
  } else {
    store = new MemoryStore();
  }

  if (localCfg.adminUser && localCfg.adminPass) {
    const existing = await store.findByUsername(localCfg.adminUser);
    if (!existing) {
      const hash = isHash(localCfg.adminPass)
        ? localCfg.adminPass
        : await hashPassword(localCfg.adminPass);
      await store.create({
        username: localCfg.adminUser,
        passwordHash: hash,
        roles: ['admin'],
      });
    }
  }

  return store;
}

export function mountLocalRoutes(
  router: Router,
  store: UserStore,
  config: AuthConfig,
): void {
  router.post('/login', async (req, res) => {
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      res.status(400).json({ error: 'username and password required' });
      return;
    }

    const user = await store.findByUsername(username);
    if (!user || !user.passwordHash) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (config.allowlist && config.allowlist.length > 0) {
      if (!config.allowlist.includes(user.username)) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }
    }

    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      provider: 'local',
    };
    req.session.user = authUser;
    req.session.save((err) => {
      if (err) {
        res.status(500).json({ error: 'Session error' });
        return;
      }
      const returnTo = (req.session as { returnTo?: string }).returnTo ?? '/';
      delete (req.session as { returnTo?: string }).returnTo;
      const isApi = req.headers['accept']?.includes('application/json');
      if (isApi) {
        res.json({ user: authUser, redirectTo: returnTo });
      } else {
        res.redirect(returnTo);
      }
    });
  });
}
