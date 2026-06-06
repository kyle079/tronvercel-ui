import {
  LoginForm,
  SSOButton,
  UserMenu,
} from '@tronvercel/ui';
import { AuthContext } from '@/components/ui/auth/context';
import type { AuthContextValue } from '@/components/ui/auth/types';
import { ComponentDemo, Section } from './shared';

const MOCK_CTX: AuthContextValue = {
  user: { id: '1', username: 'kyle079', roles: ['admin'], provider: 'local' },
  loading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  refresh: async () => {},
};

export function AuthSection() {
  return (
    <div>
      <Section title="Auth components">
        <ComponentDemo
          name="AuthCard"
          description="Centered card frame for auth flows. Provides consistent layout for login, signup, etc."
          demo={
            <div className="w-full max-w-xs">
              <div className="rounded-lg border border-line bg-surface p-6 shadow-panel">
                <div className="mb-4 text-center">
                  <div className="mb-2 font-mono text-xs text-accent">◆ tronvercel</div>
                  <h2 className="text-base font-semibold text-fg">Sign in</h2>
                  <p className="mt-0.5 text-xs text-muted">Enter your credentials</p>
                </div>
                <p className="text-center text-xs text-faint">
                  (AuthCard wraps children in a centered modal card)
                </p>
              </div>
            </div>
          }
          code={`import { AuthCard } from '@tronvercel/ui';

<AuthCard
  title="Sign in"
  subtitle="Enter your credentials"
  logo={<span className="font-mono text-accent">◆</span>}
>
  {/* LoginForm or custom content */}
</AuthCard>`}
        />

        <ComponentDemo
          name="LoginForm"
          description="Pre-built login form with username, password, submit, error display, and SSO slot."
          demo={
            <div className="w-full max-w-xs">
              <LoginForm
                onSubmit={async (_u, _p) => {
                  await new Promise((r) => setTimeout(r, 500));
                }}
                ssoButtons={
                  <SSOButton label="Sign in with SSO" href="#" />
                }
              />
            </div>
          }
          code={`import { LoginForm, SSOButton } from '@tronvercel/ui';

<LoginForm
  onSubmit={async (username, password) => {
    await signIn({ username, password });
  }}
  ssoButtons={<SSOButton label="Sign in with SSO" href="/auth/sso" />}
/>`}
        />

        <ComponentDemo
          name="SSOButton"
          description="SSO redirect link styled as a button with optional provider icon."
          demo={
            <div className="flex flex-col gap-2">
              <SSOButton label="Sign in with SSO" href="#" />
              <SSOButton
                label="Sign in with GitHub"
                href="#"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                }
              />
            </div>
          }
          code={`import { SSOButton } from '@tronvercel/ui';

<SSOButton label="Sign in with SSO" href="/auth/sso" />
<SSOButton
  label="Sign in with GitHub"
  href="/auth/github"
  icon={<GithubIcon />}
/>`}
        />

        <ComponentDemo
          name="UserMenu"
          description="Avatar button that reveals a user menu with profile and logout. Requires AuthProvider."
          demo={
            <AuthContext.Provider value={MOCK_CTX}>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted">Logged in as kyle079</span>
                <UserMenu />
              </div>
            </AuthContext.Provider>
          }
          code={`import { AuthProvider, UserMenu } from '@tronvercel/ui';

<AuthProvider
  user={{ username: 'alice', email: 'alice@example.com', roles: [] }}
  onLogout={() => signOut()}
>
  <UserMenu />
</AuthProvider>`}
        />
      </Section>
    </div>
  );
}
