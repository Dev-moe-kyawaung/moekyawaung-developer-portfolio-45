# Contributing to Moe Kyaw Aung — Developer Portfolio

First off, thanks for taking the time to contribute! 🎉 This document lays out
the guidelines for contributing to this project.

## Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By
participating, you agree to uphold it.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before submitting a bug report:

- Check existing [Issues](https://github.com/Dev-moe-kyawaung/moekyawaung-developer-portfolio-45/issues)
  to avoid duplicates.
- Confirm the issue is reproducible on the latest `main` build.

When filing, please include:

- A clear, descriptive title
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots/GIFs if it's a visual/animation bug
- Browser, OS, and device info

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- A clear description of the enhancement
- Why it would be useful
- Mockups or references, if applicable (especially for animation/theme ideas)

### 🔧 Pull Requests

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Make your changes**, following the code style guidelines below.
4. **Test locally**:
   ```bash
   npm run dev
   ```
5. **Verify the production build works**:
   ```bash
   npm run build
   npm run preview
   ```
6. **Commit** using clear, conventional messages (see below).
7. **Push** to your fork and open a **Pull Request** against `main`.
8. Fill out the PR template, linking any related issues.

## Development Setup

```bash
git clone https://github.com/Dev-moe-kyawaung/moekyawaung-developer-portfolio-45.git
cd moekyawaung-developer-portfolio-45
npm install
npm run dev
```

## Code Style Guidelines

- **TypeScript**: keep strict typing; avoid `any` unless unavoidable.
- **Components**: functional components with hooks; one component per file
  where practical.
- **Styling**: Tailwind CSS utility classes; use `clsx` / `tailwind-merge` for
  conditional/merged class logic instead of manual string concatenation.
- **Animations**: use `react-intersection-observer` for scroll-triggered
  reveals and `react-type-animation` for text effects — keep new animations
  consistent with the existing cyberpunk/neon motion language (easing,
  duration, glow style).
- **Icons**: use `react-icons` rather than adding new icon dependencies.
- **Formatting**: keep formatting consistent with the surrounding code
  (indentation, quote style, trailing commas).

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add glitch-hover effect to project cards
fix: correct typewriter animation timing on mobile
docs: update README with new screenshots
style: adjust neon glow intensity on hero section
refactor: extract animation variants into shared config
chore: bump dependencies
```

## Pull Request Checklist

- [ ] Code builds successfully (`npm run build`)
- [ ] No new TypeScript errors
- [ ] Changes tested in both desktop and mobile viewports
- [ ] Animations remain smooth (no jank/layout shift)
- [ ] Screenshots updated in `docs/screenshots/` if UI changed
- [ ] PR description clearly explains the change and motivation

## Questions?

Open a [Discussion](https://github.com/Dev-moe-kyawaung/moekyawaung-developer-portfolio-45/issues)
or reach out via [@Dev-moe-kyawaung](https://github.com/Dev-moe-kyawaung).

Thanks again for contributing! 🚀
