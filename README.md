# danGF UI

Themeable, framework-agnostic React components extracted from the interaction patterns behind [decision maker](https://decisionmaker.online/). `dangf-ui` ships precompiled CSS, has no Tailwind requirement for consumers, and supports React 18.2 and React 19.

## Install

```sh
pnpm add dangf-ui
```

React and React DOM are peer dependencies:

```sh
pnpm add react react-dom
```

Import the neutral base theme once near the root of your application:

```tsx
import 'dangf-ui/styles.css';
import { Button, Dialog } from 'dangf-ui';
```

For the opt-in warm preset, also import its token overrides and add the theme class to an ancestor:

```tsx
import 'dangf-ui/styles.css';
import 'dangf-ui/themes/warm.css';

export function App({ children }: { children: React.ReactNode }) {
  return <main className="dgf-theme-warm">{children}</main>;
}
```

The warm preset can also be activated with `data-dgf-theme="warm"`.

## Entry points

| Import | Components |
| --- | --- |
| `dangf-ui` | Button, KeycapButton, Card, Badge, Tag, Input, Textarea, Checkbox, Switch, Slider, Progress, Skeleton, Spinner, Tooltip, FieldTip, Dialog, ConfirmDialog, Drawer, ActionMenu, ResponsivePopover |
| `dangf-ui/patterns` | LoadingOverlay, EmptyState, Breadcrumb, SearchInput, Pagination, Coachmark, PropertyRow, SplitLayout, SplitDialog |
| `dangf-ui/media` | ImageWithFallback, ImagePreviewDialog, ImageDropzone, VideoWithPoster |
| `dangf-ui/patterns/marketing` | Section, SectionHeading, GlowCard, StepCard, CornerBadge |
| `dangf-ui/styles.css` | Neutral theme, component utilities, animation styles |
| `dangf-ui/themes/warm.css` | Optional warm token preset |

All public components expose precise prop types, accept `className`, and render stable `data-slot` attributes. Icons default to Lucide and icon-bearing APIs accept replacement React nodes.

### Keycap button

`KeycapButton` renders a layered, pressable control without requiring consumer-side Tailwind configuration. Use the rounded shape for text actions or the circle shape with the icon size for compact controls.

```tsx
import { Star } from 'lucide-react';
import { KeycapButton } from 'dangf-ui';

<KeycapButton>Run</KeycapButton>

<KeycapButton aria-label="Save" shape="circle" size="icon">
  <Star />
</KeycapButton>

<KeycapButton aria-label="Saved" aria-pressed shape="circle" size="icon" tone="accent">
  <Star />
</KeycapButton>
```

### Responsive size props

`Button` and `KeycapButton` accept either a scalar `size` or a mobile-first
responsive value. Unspecified breakpoints inherit the closest smaller value.
The public breakpoints are `sm` (40rem), `md` (48rem), `lg` (64rem), `xl`
(80rem), and `2xl` (96rem).

```tsx
<Button size={{ base: 'sm', md: 'lg' }}>Save</Button>

<KeycapButton
  aria-label="Save"
  shape="circle"
  size={{ base: 'icon-compact', sm: 'icon' }}
>
  <Star />
</KeycapButton>
```

Responsive values are resolved to precompiled CSS classes. They do not use
viewport JavaScript and do not require Tailwind CSS in the consuming app.

## Next.js and Vite

Interactive build entries retain the `"use client"` directive. DOM access is deferred to effects and event handlers, so importing the package during server rendering is safe. CSS is precompiled: consumer projects do not need Tailwind or a Tailwind content configuration.

The repository verifies packed tarballs in two isolated fixtures:

- React 18.2 with Vite
- React 19.2.8 with Next.js App Router

## Accessibility

Overlay primitives use Radix for focus trapping, Escape behavior, focus restoration, collision handling, and keyboard navigation. Storybook runs interaction tests and axe checks with accessibility violations treated as errors.

## Development

```sh
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build-storybook
pnpm test:pack
```

`pnpm dev` starts Storybook for local component development. `pnpm storybook` remains available as an equivalent alias.

`pnpm test:pack` builds a real npm tarball, installs it into both smoke fixtures, and builds those applications. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the release workflow.

## License and origin

MIT © jbgf1. See [LICENSE](./LICENSE) for the license text.
