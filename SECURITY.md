# Security Policy

## Supported Versions

This is a personal portfolio site deployed from the `main` branch. Only the
latest commit on `main` is actively supported/patched.

| Branch | Supported |
|---|---|
| `main` | ✅ |
| older tags/branches | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in this project (e.g. dependency
vulnerabilities, XSS via rendered content, exposed secrets, build/deploy
misconfiguration), please **do not open a public issue**.

Instead, report it privately using one of the following:

- **GitHub Private Vulnerability Reporting**: Go to the
  [Security tab](https://github.com/Dev-moe-kyawaung/moekyawaung-developer-portfolio-45/security)
  of this repository → **Report a vulnerability**
- **Direct contact**: Open a private message to
  [@Dev-moe-kyawaung](https://github.com/Dev-moe-kyawaung) via GitHub

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce (proof of concept, if possible)
- Any relevant logs, screenshots, or affected file/dependency versions

### Response Expectations

| Stage | Target Timeline |
|---|---|
| Acknowledgement of report | Within 3 business days |
| Initial assessment | Within 7 days |
| Fix or mitigation | Depends on severity — critical issues prioritized |

This is a solo-maintained open-source project, so timelines are best-effort
rather than SLA-backed.

## Scope

This policy covers:

- Application source code in `src/`
- Build configuration (`vite.config.ts`, `tsconfig.json`, `package.json`)
- Direct dependencies declared in `package.json`

It does **not** cover the third-party static hosting platform used for the
live deployment.

## Disclosure Policy

Please allow a reasonable window for a fix to be shipped before any public
disclosure. Credit will be given to reporters in release notes unless
anonymity is requested.

## Dependency Security

This project uses npm. Contributors and maintainers should periodically run:

```bash
npm audit
```

and address any high/critical findings before merging to `main`.
