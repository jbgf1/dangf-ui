# Origin and extraction notes

danGF UI 0.1.0 was derived from reusable interface patterns in the BreakToGoal repository at the committed `dev` revision `0516ce2`. Source inspection and extraction used committed objects only (`git show 0516ce2:<path>`); the BreakToGoal working tree and its uncommitted changes were not read as source input or modified.

The main source lineage includes files under `components/ui/`, notably primitives and the `components/ui/common/` patterns, together with `components/common/MobileDrawer.tsx`. The extraction intentionally combined and redesigned several implementation families:

- `Modal.tsx` and `PortalModal.tsx` became the Radix-based `Dialog`.
- Confirmation variants became `ConfirmDialog`.
- `MobileDrawer.tsx` and `common/PageDrawer.tsx` informed `Drawer`.
- `common/anchored-editor-popover.tsx` informed `ResponsivePopover`.
- `text-input.tsx` informed the IME-aware commit behavior in `Input`.
- `progress.tsx` and `common/linear-progress.tsx` became `Progress`.
- `common/simple-image.tsx` and `common/media-dropzone.tsx` became the media entry point.

Next.js imports, BreakToGoal aliases, subscriptions, domain types, upload backends, branding, and product-specific copy were removed. Internal portal, focus, scroll, positioning, and class-composition helpers are not public API.

Brand-specific and domain-specific components listed in the extraction plan were intentionally excluded.
