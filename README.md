# @tronvercel/ui

Shared React component library with the **restrained Tron/Vercel theme** — dark, geometric, precise. Built on [shadcn/ui](https://ui.shadcn.com/) primitives (Radix UI + Tailwind CSS).

**[Component Showcase →](https://kyle079.github.io/tronvercel-ui/)**

## Supported Import Contract

Downstream apps should treat only these paths as public API:

| Import path | Purpose |
|-------------|---------|
| `@tronvercel/ui` | All supported React components, hooks, and exported types |
| `@tronvercel/ui/styles` | Full library stylesheet: tokens + base layer + utility component styles |
| `@tronvercel/ui/tokens` | Token-only stylesheet for apps that want the Tronvercel palette without the base resets |

Deep imports such as `@tronvercel/ui/src/...` or `@tronvercel/ui/dist/...` are not supported and may break without notice.

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary, default, ghost, danger variants + sm/md/icon sizes |
| `Input` | Single-line text input |
| `Textarea` | Resizable multi-line text |
| `Label` | Form label (pairs with any form control) |
| `Select` | Dropdown select (Radix-based) |
| `Checkbox` | Tri-state checkbox (checked / indeterminate / unchecked) |
| `Switch` | Toggle switch |
| `RadioGroup` / `RadioItem` | Radio group |
| `Badge` | Tone-aware badge (neutral/accent/ok/warn/danger/info) |
| `StatusDot` | Inline status indicator dot |
| `StatusPill` | Status dot + label pill |
| `Panel` / `PanelHeader` / `PanelBody` | Card/panel surface with optional structured header |
| `Card` / `CardHeader` / `CardBody` / `CardFooter` | Content card (default / flush / ghost variants) |
| `TableRoot` / `TableHead` / `TableBody` / `TableRow` / `TableTh` / `TableTd` | Data table |
| `ListRow` / `ListGroup` | List with optional leading/trailing slots |
| `Pagination` | Page navigation control |
| `Toast` / `ToastTitle` / `ToastDescription` / `ToastClose` / `ToastAction` | Radix-based toast notifications |
| `Skeleton` / `SkeletonText` | Shimmer loading placeholders |
| `Kbd` | Keyboard key glyph |
| `Spinner` | Loading spinner |

## Supported UI Families

The library contract is organized around reusable operator-facing families rather than app-specific screens:

| Family | Supported exports |
|--------|-------------------|
| Navigation shell | `AppShell`, `Sidebar`, `NavGroup`, `NavItem`, `Topbar` |
| Queue/list panels | `Panel`, `PanelHeader`, `PanelBody`, `ListRow`, `ListGroup`, `DataTable`, `Pagination` |
| Status cards | `Card`, `MetricCard`, `Badge`, `StatusDot`, `StatusPill`, `EmptyState`, `LoadingState`, `ErrorState` |
| Action rows and page controls | `PageHeader`, `Toolbar`, `FilterBar`, `ActionRow`, `ActionGroup`, `ActionMeta`, `Button`, `DropdownMenu`, `Tabs`, `CommandPalette` |
| Detail drawers and overlays | `Drawer`, `Dialog`, `Popover`, `Tooltip`, `ConfirmDialog` |
| Forms and input primitives | `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `Switch`, `RadioGroup` |
| Mobile-friendly status surfaces | `Drawer`, `Card`, `MetricCard`, `StatusPill`, `ToastManager` |
| Auth surfaces | `AuthProvider`, `AuthGuard`, `AuthCard`, `LoginForm`, `SSOButton`, `UserMenu` |

Patterns that need only layout and composition should be built from these exports instead of relying on unpublished internal files.

## Installation

```bash
npm install @tronvercel/ui
```

### Peer dependencies

```bash
npm install react react-dom \
  @radix-ui/react-checkbox @radix-ui/react-radio-group \
  @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-toast \
  lucide-react clsx tailwind-merge
```

Only install the Radix packages for components you actually use. `lucide-react`, `clsx`, and `tailwind-merge` are required for core utilities.

### CSS

Import the stylesheet **once** at your app entry point:

```ts
// main.tsx
import '@tronvercel/ui/styles';
```

The stylesheet injects the CSS custom properties (design tokens). Without it, components render but without theme colors.

If your app already owns its reset/base layer, import tokens only:

```ts
import '@tronvercel/ui/tokens';
```

## Usage

```tsx
import { Button, Badge, Input, Panel, PanelHeader, PanelBody } from '@tronvercel/ui';

function MyPage() {
  return (
    <Panel flush>
      <PanelHeader title="Deployments" hint="3 active" actions={<Button size="sm">Deploy</Button>} />
      <PanelBody>
        <Badge tone="ok">running</Badge>
      </PanelBody>
    </Panel>
  );
}
```

## Theming

The theme is defined entirely through **CSS custom properties** (channel triples — `R G B` without the `rgb()` wrapper so Tailwind's opacity modifier works):

```css
/* surfaces */
--c-ink:         6 8 10;     /* deepest background */
--c-base:        10 13 15;   /* app background */
--c-surface:     16 20 23;   /* panels, cards */
--c-raised:      22 27 31;   /* hover / lifted state */
--c-overlay:     20 25 29;   /* dialogs, popovers */

/* lines */
--c-line:        33 41 46;   /* hairline borders */
--c-line-strong: 46 57 64;   /* emphasized edges */

/* text */
--c-fg:          226 231 233; /* primary text */
--c-muted:       138 150 155; /* secondary text */
--c-faint:       92 103 108;  /* tertiary / disabled */

/* accent — restrained technical cyan, never glowing */
--c-accent:      52 192 212;
--c-accent-fg:   6 8 10;
--c-accent-dim:  38 110 122;

/* status */
--c-ok:          63 185 80;
--c-warn:        210 153 34;
--c-danger:      248 81 73;
--c-info:        88 166 255;
```

### Overriding tokens

Wrap your app (or a subtree) in a container that overrides the CSS variables:

```css
/* my-app.css */
:root {
  --c-accent: 120 80 255;   /* purple accent instead of cyan */
}
```

### Tailwind integration

If you use Tailwind in your app, copy the `theme.colors` block from [tailwind.config.ts](./tailwind.config.ts) into your project config to get autocomplete and use the same token names (`bg-surface`, `text-muted`, etc.).

## Storybook

```bash
npm run storybook        # dev server on :6006
npm run build-storybook  # static build → storybook-static/
```

Stories live in `stories/` and cover every component with its variants and states:

| Story group | Contents |
|-------------|----------|
| **Design/Tokens** | Color token swatches |
| **UI/Button** | Variants, sizes, disabled |
| **UI/Badge** | Tones, StatusDot, StatusPill |
| **UI/Primitives** | Input, Spinner, Panel, Kbd |
| **UI/FormControls** | Label, Textarea, Checkbox, Switch, Select, RadioGroup, composite form |
| **UI/DataDisplay** | Card, Skeleton, Table, ListRow, Pagination, Toast |

## Migration guide

### From Gas Town's gastown theme (first consumer)

gastown ships its own Tailwind token set. tronvercel-ui is a **port** of that token set into a standalone library. CSS variable names are identical so the visual output is the same.

**Step 1 — install**

```bash
npm install @tronvercel/ui
npm install @radix-ui/react-checkbox @radix-ui/react-radio-group \
  @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-toast \
  lucide-react clsx tailwind-merge
```

**Step 2 — swap the stylesheet import**

```diff
- import '@/styles/globals.css';   // local token file
+ import '@tronvercel/ui/styles';
```

**Step 3 — replace local component imports**

```diff
- import { Button } from '@/components/ui/button';
+ import { Button } from '@tronvercel/ui';
```

Component APIs are identical — no prop changes needed.

**Step 4 — remove the shadowed files**

Delete the local `src/components/ui/` copies you've replaced. Keep any project-specific components that extend or compose library components.

### From a different design system (Newel and others)

1. Import `@tronvercel/ui/styles` to inject the token layer.
2. Replace your button/input/badge/etc. imports one component at a time.
3. Use `npm run storybook` to visually verify each component after migration.
4. Token overrides (see **Theming** above) let you adjust specific colors without forking.

## Workspace Consumption

For a sibling app inside the same repo or monorepo, depend on the package directly instead of relying on implicit resolver behavior:

```json
{
  "dependencies": {
    "@tronvercel/ui": "file:.."
  }
}
```

That keeps imports identical between local workspace use and a published npm install.

## Development

```bash
npm install
npm run build        # compile to dist/
npm run verify-consumer  # verify packaged public surface
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run storybook    # interactive component explorer
```

The library is built with Vite in library mode. `src/index.ts` is the public API surface — add new component exports there.
