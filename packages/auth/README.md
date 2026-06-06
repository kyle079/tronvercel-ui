# @tronvercel/auth

Shared authentication for Tronvercel apps. Provides Express middleware for local username/password and OIDC/SSO, plus drop-in React components via `tronvercel-ui`.

## Quick start

```bash
npm install @tronvercel/auth express express-session
```

### Minimal setup (local auth)

```ts
import express from 'express'
import { createAuthMiddleware } from '@tronvercel/auth'

const app = express()

// createAuthMiddleware reads all config from env vars
const auth = await createAuthMiddleware()

app.use('/auth', auth.router)   // mounts session + /auth/* routes
app.use(auth.protect())         // default-deny everything below
app.use('/', myRouter)
```

Required env:
```
AUTH_SESSION_SECRET=<random 32+ char string>
AUTH_ADMIN_USER=admin
AUTH_ADMIN_PASS=mysecretpassword
```

### OIDC / SSO mode

```
AUTH_MODE=oidc
AUTH_SESSION_SECRET=<random>
AUTH_OIDC_ISSUER=https://auth.example.com
AUTH_OIDC_CLIENT_ID=myapp
AUTH_OIDC_CLIENT_SECRET=<secret>
AUTH_OIDC_REDIRECT_URI=https://myapp.example.com/auth/callback
```

### Both modes

```
AUTH_MODE=both
AUTH_SESSION_SECRET=<random>
AUTH_ADMIN_USER=admin
AUTH_ADMIN_PASS=<password>
AUTH_OIDC_ISSUER=https://auth.example.com
AUTH_OIDC_CLIENT_ID=myapp
AUTH_OIDC_CLIENT_SECRET=<secret>
AUTH_OIDC_REDIRECT_URI=https://myapp.example.com/auth/callback
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `AUTH_MODE` | `local` | `local`, `oidc`, or `both` |
| `AUTH_SESSION_SECRET` | — | **Required.** Cookie signing secret |
| `AUTH_SESSION_NAME` | `auth_session` | Cookie name |
| `AUTH_SESSION_MAX_AGE` | `86400000` | Session TTL in ms (24h) |
| `AUTH_ADMIN_USER` | — | Seed admin username (local mode) |
| `AUTH_ADMIN_PASS` | — | Seed admin password, plaintext or bcrypt hash |
| `AUTH_USERS_FILE` | — | Path to JSON user store file |
| `AUTH_OIDC_ISSUER` | — | OIDC issuer URL |
| `AUTH_OIDC_CLIENT_ID` | — | OIDC client ID |
| `AUTH_OIDC_CLIENT_SECRET` | — | OIDC client secret |
| `AUTH_OIDC_REDIRECT_URI` | — | OIDC redirect URI |
| `AUTH_OIDC_SCOPE` | `openid profile email` | OIDC scope |
| `AUTH_OIDC_ROLES_CLAIM` | `roles` | JWT claim to read roles from |
| `AUTH_OIDC_ALLOWLIST_CLAIM` | `preferred_username` | JWT claim used for allowlist check |
| `AUTH_ALLOWLIST` | — | Comma-separated username allowlist |
| `AUTH_MOUNT_PATH` | `/auth` | Path where auth router is mounted |
| `AUTH_LOGIN_PATH` | `/auth/login` | Redirect target for unauthenticated requests |

## Routes (mounted at AUTH_MOUNT_PATH)

| Method | Path | Description |
|---|---|---|
| `POST` | `/login` | Local login. Body: `{ username, password }` |
| `GET` | `/sso` | Redirect to OIDC provider |
| `GET` | `/callback` | OIDC callback |
| `POST` | `/logout` | Destroy session |
| `GET` | `/me` | Current user JSON |

## Forward-auth (Traefik / Nginx)

```ts
app.use('/auth', auth.router)
app.get('/_forward_auth', auth.forwardAuth())
```

Nginx config:
```nginx
auth_request /_forward_auth;
auth_request_set $auth_user $upstream_http_x_auth_user;
```

Returns `200` with `X-Auth-User` / `X-Auth-Roles` headers when authenticated, `401` otherwise.

## Custom user store

```ts
import type { UserStore, StoredUser } from '@tronvercel/auth'
import { createAuthMiddleware, hashPassword } from '@tronvercel/auth'

class MyDBStore implements UserStore {
  async findByUsername(username: string) { /* query db */ }
  async findById(id: string) { /* query db */ }
  async create(user: Omit<StoredUser, 'id'>) { /* insert */ }
  async list() { /* select */ }
}

const auth = await createAuthMiddleware({ userStore: new MyDBStore() })
```

## React UI components (tronvercel-ui)

Install in your app:
```bash
npm install tronvercel-ui
```

```tsx
import { AuthProvider, AuthGuard, LoginForm, SSOButton, UserMenu } from 'tronvercel-ui'

// Wrap your app
function App() {
  return (
    <AuthProvider authBasePath="/auth">
      <AuthGuard
        ssoButtons={<SSOButton label="Single Sign-On" href="/auth/sso" />}
      >
        <Shell />
      </AuthGuard>
    </AuthProvider>
  )
}

// In your shell / nav
function Nav() {
  return (
    <header>
      <span>My App</span>
      <UserMenu align="right" />
    </header>
  )
}
```

### Custom login page

```tsx
<AuthGuard
  loginPage={
    <AuthCard title="Sign in" subtitle="Tronvercel">
      <LoginForm
        onSubmit={login}
        ssoButtons={<SSOButton label="SSO" />}
      />
    </AuthCard>
  }
>
  <App />
</AuthGuard>
```

### useAuth hook

```tsx
import { useAuth } from 'tronvercel-ui'

function Profile() {
  const { user, logout } = useAuth()
  return (
    <div>
      <p>Signed in as {user?.username}</p>
      <button onClick={logout}>Sign out</button>
    </div>
  )
}
```
