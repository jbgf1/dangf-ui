# Contributing

Thank you for helping improve danGF UI.

## Local setup

1. Install Node.js 20.19 or newer and pnpm 10.25.
2. Run `pnpm install`.
3. Run `pnpm dev` to start Storybook for component development. The `pnpm storybook` command remains available as an equivalent alias.

Keep components focused, preserve the `dgf` utility prefix and `--dgf-*` token namespace, and avoid adding consumer-facing Tailwind requirements. Public behavior should remain SSR-safe and work in both supported React majors.

## Required checks

Before opening a pull request, run:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build-storybook
pnpm test:pack
```

Add or update a Storybook story for every public UI change. Interaction changes need a Vitest or Storybook interaction test. Accessibility violations are treated as test failures.

## Changesets

User-visible changes require a changeset:

```sh
pnpm changeset
```

Choose the smallest appropriate semantic version bump and describe the consumer-visible change. The release workflow maintains a version pull request. The first npm publish remains a maintainer-owned manual step; trusted publishing must be configured before automated publishing is enabled.
