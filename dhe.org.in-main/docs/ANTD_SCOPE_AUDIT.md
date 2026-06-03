# Ant Design scope audit (P1)

## Current wiring

- `AntdProviders` wraps **all** routes via `RootLayoutClient`.
- `@ant-design/nextjs-registry` loads global Ant Design styles on every page.

## Public-page Ant Design usage

| Component | Route(s) | Ant Design APIs |
|-----------|----------|-----------------|
| `NoticeBoard` | `/`, `/noticeboard` | List, Tabs, Modal, Button, Skeleton, Spin, icons |
| `Logos` | `/logos` | Card, icons |
| `Accounts` | `/accountdetails`, `/books` | Card, icons |

## Admin-only usage

- `noticeboarddata`, `donationdatadekh`, `WD` (tables/forms via antd patterns)

## Footer (`BottomView`)

- **After P1 sprint:** visitor spinner uses CSS only (no `Spin`).
- Contact form uses `react-hot-toast`, not antd.

## Can Ant Design be limited to admin routes only?

**Not without regressions** on public pages:

1. `/noticeboard` and homepage embedded notices require full `NoticeBoard` (antd-heavy).
2. `/logos` and `/accountdetails` use `Card` + preview icons.

## Recommended path (future, out of scope)

1. Replace `Card` on logos/accounts with Tailwind cards (small effort).
2. Split `NoticeBoard` UI: lightweight list for embed, antd only on full page — larger effort.
3. Then move `AntdProviders` to `(admin)/layout.tsx` only.

## P1 decision

**Do not remove global `AntdProviders`** in this sprint — zero-regression requirement not met.
