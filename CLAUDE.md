# react-console

React components for accessing virtual machine or server consoles. Provides VncConsole, SerialConsole, and DesktopViewer components built with PatternFly. Built with React, TypeScript, PatternFly, Webpack, noVNC, and XTerm.

## Structure

- `packages/module/src/components/` - Console component implementations
- `/packages/module/patternfly-docs/content/extensions/react-console/examples/` - MD files and live code examples for documentation

## Key Files

- Setup instructions: `README.md`
- Library package: `packages/module/package.json`
- Monorepo root: `package.json`
- Usage entry point: `packages/module/patternfly-docs/content/extensions/react-console/examples/SerialConsoleCustom.jsx`

## Commands

```bash
yarn build          # Build the library
yarn test           # Run tests
yarn lint           # Lint the codebase
```

## More Info

See [BOOKMARKS.md](BOOKMARKS.md) for noVNC, XTerm, and PatternFly documentation.
