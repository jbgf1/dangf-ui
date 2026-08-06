# dangf-ui v0.1.0 execution plan

Status: complete

## Goal

Create a publishable, themeable React component library at `dangf-ui`, generalized from BreakToGoal commit `0516ce2`, with stable package subpaths, precompiled namespaced CSS, Storybook documentation, automated tests, smoke fixtures, CI, and release automation.

## Context and constraints

- Source files are read only through `git show 0516ce2:<path>`; the BreakToGoal working tree must not be modified.
- The package supports React 18.2 and React 19 in browser applications using Next.js or Vite.
- Consumers import compiled CSS and do not need Tailwind.
- The first version is independently validated and is not wired back into BreakToGoal.
- GitHub repository creation and npm publication are external actions and are not part of local implementation.

## Scope and non-goals

- Include the documented core, overlay, product-pattern, media, and marketing-pattern interfaces.
- Consolidate duplicate overlay and progress implementations behind smaller public interfaces.
- Keep portals, scroll locking, positioning, class merging, and low-level accessibility helpers internal.
- Do not include BreakToGoal branding, subscriptions, target/routine domain types, Next.js-only wrappers, React Native, React 17, or dark theme support.

## Implementation checklist

- [x] **P1.1 — Scaffold the publishable repository**
  - Target: package manifest, TypeScript, Vite, ESLint, Vitest, pnpm workspace, gitignore
  - Change: configure ESM/CJS/type output, React peers, package exports, and strict checks
  - Depends on: None
  - Completion: package scripts and manifests describe the complete build and validation workflow
  - Validation: inspect manifests and run package typecheck/build

- [x] **P1.2 — Establish styles and themes**
  - Target: base stylesheet and warm theme
  - Change: provide precompiled, `dgf-` class and `--dgf-*` variable namespaces with no reset
  - Depends on: P1.1
  - Completion: package exports neutral styles and opt-in warm variables without Tailwind consumer configuration
  - Validation: CSS contract test and package build

- [x] **P2.1 — Implement core primitives**
  - Target: root package interface
  - Change: implement Button, Card, Badge, Tag, Input, Textarea, Checkbox, Switch, Slider, Progress, Skeleton, Spinner, Tooltip, and FieldTip
  - Depends on: P1.2
  - Completion: all primitives have precise props, data slots, theme styles, and named exports
  - Validation: unit tests, Storybook stories, and typecheck

- [x] **P2.2 — Implement overlay modules**
  - Target: root package interface
  - Change: implement Dialog, ConfirmDialog, Drawer, ActionMenu, and ResponsivePopover using accessible Radix primitives
  - Depends on: P2.1
  - Completion: controlled interfaces internalize portals, focus, escape handling, collision behavior, and scroll locking
  - Validation: overlay interaction tests and Storybook stories

- [x] **P2.3 — Implement product patterns**
  - Target: `dangf-ui/patterns`
  - Change: implement LoadingOverlay, EmptyState, Breadcrumb, SearchInput, Pagination, Coachmark, PropertyRow, SplitLayout, and SplitDialog
  - Depends on: P2.1, P2.2
  - Completion: patterns depend only on public/core internals and expose no BreakToGoal types
  - Validation: pattern tests, Storybook stories, and typecheck

- [x] **P2.4 — Implement media and marketing patterns**
  - Target: `dangf-ui/media` and `dangf-ui/patterns/marketing`
  - Change: implement ImageWithFallback, ImagePreviewDialog, ImageDropzone, VideoWithPoster, Section, SectionHeading, GlowCard, StepCard, and CornerBadge
  - Depends on: P2.1, P2.2
  - Completion: media owns only local preview/validation behavior and marketing remains a separate subpath
  - Validation: media lifecycle tests, stories, and typecheck

- [x] **P3.1 — Add component documentation**
  - Target: Storybook configuration and stories
  - Change: document all public interfaces, states, mobile viewports, neutral theme, and warm theme
  - Depends on: P2.1 through P2.4
  - Completion: every public component appears in Storybook and Storybook builds statically
  - Validation: Storybook test and build commands

- [x] **P3.2 — Add consumer smoke fixtures**
  - Target: React 18 + Vite and React 19 + Next fixtures
  - Change: install a packed tarball and render imports from each public subpath without consumer Tailwind
  - Depends on: P1.1 through P2.4
  - Completion: both fixtures build from package artifacts rather than source aliases
  - Validation: smoke script

- [x] **P3.3 — Add CI, Pages, and release automation**
  - Target: GitHub workflows and Changesets
  - Change: validate all gates, deploy Storybook to Pages, and prepare OIDC-compatible Changesets publishing
  - Depends on: P3.1, P3.2
  - Completion: workflows contain least-privilege permissions and no long-lived npm token requirement
  - Validation: workflow static inspection and local commands mirrored by CI

- [x] **P4.1 — Complete documentation and provenance**
  - Target: README, LICENSE, CONTRIBUTING, SECURITY, CHANGELOG, ORIGIN
  - Change: document installation, subpaths, themes, browser/React support, release setup, and extraction baseline
  - Depends on: P1 through P3
  - Completion: a new maintainer or consumer can build, test, use, and release the package
  - Validation: package dry run and link inspection

## Final acceptance

- [x] `pnpm lint` passes.
- [x] `pnpm typecheck` passes.
- [x] `pnpm test` passes.
- [x] `pnpm build` passes and outputs ESM, CJS, declarations, and CSS.
- [x] `pnpm build-storybook` passes.
- [x] `pnpm test:pack` passes for both smoke fixtures.
- [x] Package dry run contains only intended publish artifacts and documentation.
- [x] The target repository is initialized independently without modifying BreakToGoal.

## Risks and rollback

- Radix overlay semantics may differ from the original custom implementations; behavior is accepted only through public-interface tests.
- CSS isolation is enforced by namespaced selectors and variables; any global selector other than theme roots blocks acceptance.
- If a fixture exposes packaging incompatibility, adjust package exports/build output rather than adding consumer-specific configuration.
- Before target copy, the staged repository can be discarded without affecting BreakToGoal.

## Execution log and deviations

- 2026-08-06: Source baseline and empty target path confirmed. Implementation started in an isolated temporary directory.
- 2026-08-06: npm's stable React tag was verified as 19.2.8. Library development and the React 19 smoke fixture use 19.2.8 while the public peer range retains React 18.2 compatibility.
- 2026-08-06: All local quality gates passed: 63 Vitest/Storybook/axe tests, library and Storybook builds, and packed-package Vite/Next builds. pnpm 10.25 does not implement `pack --dry-run`, so the equivalent `npm pack --dry-run` check was used with an isolated temporary npm cache.
- 2026-08-06: Validated source files were copied to `/Users/wangwei/project/npm+github/dangf-ui` without build artifacts, and an independent Git repository was initialized on `main`. No commit, remote repository, or npm publication was created.
