# Contributing to the Contentstack UI Extensions SDK

Thanks for helping. This package is public and runs inside customers' existing custom fields, widgets and dashboard widgets, so changes are held to a strict compatibility bar. New features belong in the [App SDK](https://github.com/contentstack/app-sdk); this SDK takes bug and security fixes.

## Reporting
- Bugs: open a GitHub issue with the SDK version, the extension type, and steps to reproduce.
- Security issues: do not open an issue; follow [SECURITY.md](SECURITY.md).

## Pull requests
1. Fork, branch from `master`, and run `npm ci --legacy-peer-deps`.
2. Keep the public API stable: no change to exported names or method signatures, and no runtime change unless it fixes a bug. Say in the PR what consumers will see differ, or that nothing changes.
3. Add or update specs in `test/`, then run `npm test` and `npm run build`.
4. Update `docs/ui-extensions-api-reference.md` when the public API changes.
5. Open the pull request against `master`. A code owner reviews it, and the security checks must pass.

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE).
